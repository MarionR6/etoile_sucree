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
        res.send(JSON.stringify(result));
    });
});

// GET RECIPES DETAILS

router.get("/getRecipeDetails/:id", (req, res) => {
    const idRecipe = req.params.id;
    const sql = `SELECT * FROM recipes WHERE idRecipe = ?`;
    connection.query(sql, [idRecipe], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

// GET 3 LATEST RECIPES FROM DATABASE TO DISPLAY THEM ON HOMEPAGE

router.get("/getRecipesHomepage", (req, res) => {
    const sql = `SELECT * FROM recipes ORDER BY idRecipe DESC LIMIT 3`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

router.get("/getFaves/:idUser", (req, res) => {
    const idUser = req.params.idUser;
    const sql = "SELECT recipes.idRecipe, recipes.recipeName, recipes.img FROM users INNER JOIN favorites ON users.idUser = favorites.idUser INNER JOIN recipes ON favorites.idRecipe = recipes.idRecipe WHERE users.idUser = ?";
    connection.query(sql, [idUser], (err, result) => {
        if (err) throw (err);
        res.send(JSON.stringify(result));
    });
});

router.post("/likeRecipe/:idUser", (req, res) => {
    const idUser = req.params.idUser;
    const { idRecipe } = req.body;
    const verifySql = "SELECT * FROM favorites WHERE idRecipe = ? AND idUser = ?";
    connection.query(verifySql, [idRecipe, idUser], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const deleteSQL = "DELETE FROM favorites WHERE idRecipe = ? AND idUser = ?";
            connection.query(deleteSQL, [idRecipe, idUser], (err, result) => {
                if (err) throw err;
                console.log("Disliked the already liked recipe");
            });
        } else {
            const sql = "INSERT INTO favorites (idRecipe, idUser) VALUES (?, ?)";
            connection.query(sql, [idRecipe, idUser], (err, result) => {
                if (err) throw err;
                console.log("Recipe Liked !");
                res.sendStatus(200);
            });
        }
    });

});

router.delete("/dislike/:idUser", (req, res) => {
    const idUser = req.params.idUser;
    const { idRecipe } = req.body;
    const sql = "DELETE FROM favorites WHERE idRecipe = ? AND idUser = ?";
    connection.query(sql, [idRecipe, idUser], (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

router.delete("/deleteRecipe", (req, res) => {
    const { idRecipe } = req.body;
    console.log(req.body);
    const sqlDeleteFavorite = "DELETE FROM favorites WHERE idRecipe = ?";
    connection.query(sqlDeleteFavorite, [idRecipe], (err, result) => {
        if (err) throw err;
        const sqlDelete = "DELETE FROM recipes WHERE idRecipe = ?";
        connection.query(sqlDelete, [idRecipe], (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

router.patch("/modifyRecipe/:id", upload.single("img"), async (req, res) => {
    const idRecipePatched = req.params.id;
    const { recipeName, cookingTime, preparingTime, difficulty, instructions, cakeIngredients, icingIngredients, nbrOfPeople } = req.body;
    let img = req.file.filename;
    const sqlVerify = "SELECT idRecipe FROM recipes WHERE recipeName = ?";
    connection.query(sqlVerify, [recipeName], (err, result) => {
        if (result.length) {
            if (result[0].idRecipe !== idRecipePatched) {
                res.status(401).json("Une recette porte déjà ce nom.");
            }
        } else {
            const sqlPatch = "UPDATE recipes SET recipeName = ?, cookingTime = ?, preparingTime = ?, difficulty = ?, instructions = ?, img = ?, cakeIngredients = ?, icingIngredients = ?, nbrOfPeople = ? WHERE idRecipe = ?";
            connection.query(sqlPatch, [recipeName, cookingTime, preparingTime, difficulty, instructions, img, cakeIngredients, icingIngredients, nbrOfPeople, idRecipePatched], (err, result) => {
                if (err) throw err;
                res.status(200).json("Recette modifiée avec succès.");
            });
        }
    });

});

module.exports = router;