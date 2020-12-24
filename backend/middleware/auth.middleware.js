const jwt = require('jsonwebtoken');

const db   = require("../models");
const User = db.users;

const dotenv = require('dotenv').config();

async function getUserAdminStatus(userId) {
    try {
        return User.findOne({
            where: { id: `${userId}` }
        })
        .then(userFound => {
                if (!userFound) {
                    return res.status(401).json({ error: 'user not found' });
                } else {
                    if (userFound.isAdmin === true) {
                        return true;
                    } else {
                        return false;
                    }
                }
            })
        .catch(error => res.status(500).json({ error: 'unable to verify user' }));
    } catch {
        res.status(500).json({ error: 'unable to verify user' });
    }
}

module.exports = (req, res, next) => {
    try {
        const token        = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
        const userId       = decodedToken.userId;

        getUserAdminStatus(userId)
            .then(response => {
                if (req.body.userId && req.body.userId !== userId) {
                    throw 'Invalid user ID';
                } else {
                    res.locals.userId  = userId;
                    res.locals.isAdmin = response;
                    next();
                }
            })
            .catch(error => res.status(500).json({ error: 'unable to verify user' }));
    } catch {
        res.status(401).json({ error: 'Invalid request!' });
    }
};

