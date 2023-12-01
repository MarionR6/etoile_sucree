const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const connection = require("../../database");

//UPLOAD IMAGES

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "../../upload"));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        console.log(file);
        cb(null, true);
    }
});

//ADD NEW RECIPES TO DATABASE AND UPLOAD IMAGES TO THE SERVER

router.post("/addRecipe", upload.single("img"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const { recipeName, cookingTime, preparingTime, difficulty, instructions, cakeIngredients, icingIngredients, nbrOfPeople } = req.body;
    let img = req.file.filename;
    const sql = `INSERT INTO recipes (recipeName, cookingTime, preparingTime, difficulty, instructions, img, cakeIngredients, icingIngredients, nbrOfPeople) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [recipeName, cookingTime, preparingTime, difficulty, instructions, img, cakeIngredients, icingIngredients, nbrOfPeople], (err, result) => {
        if (err) throw err;
        let validateRecipe = { messageGood: "La recette a bien été ajoutée en base de données" };
        res.send(validateRecipe);
    });
});

// GET ALL RECIPES

router.get("/getRecipes", (req, res) => {
    const sql = `SELECT * FROM recipes ORDER BY idRecipe DESC`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Recettes récupérées");
        res.send(JSON.stringify(result));
    });
});

// GET 3 LATEST RECIPES FROM DATABASE TO DISPLAY THEM ON HOMEPAGE

router.get("/getRecipesHomepage", (req, res) => {
    const sql = `SELECT * FROM recipes ORDER BY idRecipe DESC LIMIT 3`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Recettes récupérées");
        res.send(JSON.stringify(result));
    });
});

router.get("/getFaves/:idUser", (req, res) => {
    const idUser = req.params.idUser;
    console.log(req.params.idUser);
    console.log("User's id", idUser);
    // const sql = "SELECT * FROM favorites WHERE idUser = ?";
    const sql = "SELECT recipes.idRecipe, recipes.recipeName, recipes.img FROM users INNER JOIN favorites ON users.idUser = favorites.idUser INNER JOIN recipes ON favorites.idRecipe = recipes.idRecipe WHERE users.idUser = ?";
    connection.query(sql, [idUser], (err, result) => {
        if (err) throw (err);
        console.log("Recettes favorites récupérées");
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    });
});

router.delete("/dislike/:idUser", (req, res) => {
    const idUser = req.params.idUser;
    const { idRecipe } = req.body;
    const sql = "DELETE FROM favorites WHERE idRecipe = ? AND idUser = ?";
    connection.query(sql, [idRecipe, idUser], (err, result) => {
        if (err) throw err;
        console.log("Recette supprimée des favoris");
        res.sendStatus(200);
    });
});

module.exports = router;