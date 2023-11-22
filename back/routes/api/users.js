const router = require("express").Router();

const bcrypt = require("bcrypt");

const connection = require("../../database");

// REGISTER

router.post("/addUser", async (req, res) => {
    console.log(req.body);
    const { name, firstname, mail, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `SELECT * FROM users WHERE mail= ?`;
    connection.query(sql, [mail], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length) {
            console.log("EMAIL EXISTANT");
            let isEmail = { message: "Email déjà existant" };
            res.send(JSON.stringify(isEmail));
        } else {
            const sqlInsert = `INSERT INTO users (name, firstname, mail, password) VALUES (?, ?, ?, ?)`;
            const values = [name, firstname, mail, hashedPassword];
            connection.query(sqlInsert, values, (err, result) => {
                if (err) throw err;
                let isEmail = { messageGood: "Inscription réussie ! Vous allez être redirigé(e)." };
                res.send(JSON.stringify(isEmail));

            });
        }
    });
});

//LOGIN

router.post("/login", (req, res) => {
    console.log(req.body);
    const { mail, password } = req.body;
    const sql = `SELECT idUser, firstname, name, mail, password FROM users WHERE mail= ?`;
    connection.query(sql, [mail], async (err, result) => {
        if (err) throw err;
        console.log(result);
        if (!result.length) {
            console.log("Email et/ou mot de passe incorrects");
            let doesExist = { message: "Email et/ou mot de passe incorrects" };
            res.send(JSON.stringify(doesExist));
        } else {
            const dbPassword = result[0].password;
            const passwordMatch = await bcrypt.compare(password, dbPassword);
            if (!passwordMatch) {
                console.log("Email et/ou mot de passe incorrects");
                let doesExist = { message: "Email et/ou mot de passe incorrects" };
                res.send(JSON.stringify(doesExist));
            } else {
                res.send(result);
            }
        }
    });
});

module.exports = router;