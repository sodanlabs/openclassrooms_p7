const jwt = require('jsonwebtoken');

const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token        = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
        const userId       = decodedToken.userId;
        const isAdmin      = decodedToken.isAdmin;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            res.locals.userId  = userId;
            res.locals.isAdmin = isAdmin;
            next();
        }
    } catch {
        res.status(401).json({ error: 'Invalid request!' });
    }
};