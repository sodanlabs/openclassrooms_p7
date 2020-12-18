// Imports
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const db   = require("../models");
const User = db.users;

// Constantes
const dotenv = require('dotenv').config();

// Create and Save new User
exports.signup = (req, res, next) => {

    // Constants REGEX
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

    // Params
    const email    = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({
        attributes: ['email'],
        where: { email: `${email}` }
    })
        .then(userFound => {
            if (!userFound) {

                // Verify the data provided by the user
                if (email == null || username == null || password == null) {
                    return res.status(400).json({ error: 'missing parameters' });
                }

                if (username.length >= 13 || username.length <= 4) {
                    return res.status(400).json({ error: 'wrong username (must be length 5 - 12)' });
                }

                if (!EMAIL_REGEX.test(email)) {
                    return res.status(400).json({ error: 'email is not valid' });
                }

                if (!PASSWORD_REGEX.test(password)) {
                    return res.status(400).json({ error: 'password invalid (must length 4 - 8 and include 1 number at least)' });
                }

                if (!req.body.isAdmin) {
                    var isAdmin = 0;
                } else {
                    var isAdmin = 1;
                }

                // Hash password and create user to the DB
                bcrypt.hash(password, 10)
                    .then(bcryptedPassword => {
                        const user = User.create({
                            email   : email,
                            username: username,
                            password: bcryptedPassword,
                            isAdmin : isAdmin
                        })
                        .then(() => res.status(201).json({ message: 'user created !' }))
                        .catch(error => res.status(400).json({ error: 'cannot add user' }));
                    })
                    .catch(error => res.status(500).json({ error: 'cannot hash password' }));

            } else {
                return res.status(400).json({ error: 'An user is already registered with this email address' });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// Auth user and return token
exports.login = (req, res, next) => {

    // Params
    const email    = req.body.email;
    const password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ error: 'missing parameters' });
    }

    User.findOne({
        where: { email: `${email}` }
    })
        .then(userFound => {
            if (!userFound) {
                return res.status(401).json({ error: 'user not found' });
            } else {
                bcrypt.compare(password, userFound.password)
                    .then(comparedPassword => {
                        if (!comparedPassword) {
                            return res.status(401).json({ error: 'invalid password' });
                        } else {
                            return res.status(200).json({
                                userId  : userFound.id,
                                username: userFound.username,
                                token   : jwt.sign(
                                    {
                                        userId  : userFound.id,
                                        isAdmin : userFound.isAdmin
                                    },
                                    process.env.JWT_SIGN_SECRET,
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error: 'cannot compare hash password' }));
            }
        })
        .catch(error => res.status(500).json({ error: 'unable to verify user' }));
};

exports.deleteAccount = (req, res, next) => {
    User.findByPk(res.locals.userId)
        .then(userFound => {
            User.destroy({
                where: { id: `${userFound.id}` }
            })
                .then(() => res.status(201).json({ message: 'user deleted !' }))
                .catch(error => res.status(400).json({ error: 'cannot delete user' }));
        })
        .catch(error => res.status(400).json({ error: 'user does not exit' }));
};