const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../db/UserDBUtils");

router.post('/registration', (req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
       if (err) {
           console.log(err);
           res.status(500).send(err);
       } else {
           let user = {
               name: req.body.name,
               surname: req.body.surname,
               email: req.body.email,
               password: hash
           };
           db.createUser(user)
               .then((val) => {
                   res.status(200).send({
                       token: generationToken(user)
                   })
               })
               .catch((err) => {
                   if (err.code === 11000) {
                       res.status(409).send({message: 'Account already exists.'});
                       return;
                   }
                   res.status(400).send(err);
           })
       }
    });
});

router.post('/login', (req, res) => {
    db.findUser({email: req.body.email})
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        res.status(200).send({
                            token: generationToken(user)
                        });
                    } else {
                        processUserNotFound(res);
                    }
                });
            } else {
                processUserNotFound(res);
            }
        })
        .catch(err => {
            res.status(400).send(err);
        })
});


let generationToken = (user) => {
    return jwt.sign({
        name: user.name,
        email: user.email,
        surname: user.surname
    }, config.auth.secretKey, {expiresIn: config.auth.expires});
};

function processUserNotFound(res) {
    res.status(401).send({
        message: 'User not found.'
    });
}



module.exports = router;
