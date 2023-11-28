const router = require("express").Router();

const bcrypt = require("bcrypt");

const connection = require("../../database");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");

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
                const token = jsonwebtoken.sign({}, key, {
                    subject: result[0].idUser.toString(),
                    expiresIn: 3600 * 24 * 30,
                    algorithm: "RS256"
                });
                res.cookie("token", token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
                console.log("Token créé");
                res.json(result[0]);
            }
        }
    });
});

router.get('/userConnected', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const decodedToken = jsonwebtoken.verify(token, keyPub, {
                algorithms: "RS256",
            });
            const sqlSelect = "SELECT idUser, name, firstname, mail, isAdmin FROM users WHERE idUser = ?";
            connection.query(sqlSelect, [decodedToken.sub], (err, result) => {
                if (err) throw err;
                const connectedUser = result[0];
                if (connectedUser) {
                    res.json(connectedUser);
                } else {
                    res.json(null);
                }
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.json(null);
    }
});

router.delete("/logout", (req, res) => {
    res.clearCookie("token");
    console.log("Déconnexion en cours");
    res.send("Cookie cleared");
});

module.exports = router;