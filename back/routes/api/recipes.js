const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const connection = require("../../database");

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

router.post("/addRecipe", upload.single("img"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const { recipeName, cookingTime, preparingTime, difficulty, instructions, cakeIngredients, icingIngredients } = req.body;
    let img = req.file.filename;
    const sql = `INSERT INTO recipes (recipeName, cookingTime, preparingTime, difficulty, instructions, img, cakeIngredients, icingIngredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [recipeName, cookingTime, preparingTime, difficulty, instructions, img, cakeIngredients, icingIngredients], (err, result) => {
        if (err) throw err;
        let validateRecipe = { messageGood: "La recette a bien été ajoutée en base de données" };
        res.send(validateRecipe);
    });
});

module.exports = router;