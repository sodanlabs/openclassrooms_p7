// Imports
const express = require('express');
const router  = express.Router();

const auth = require('../middleware/auth.middleware');

const user = require('../controllers/user.controller');

// Register a new User
router.post('/signup', user.signup);

// Login to user account
router.post('/login', user.login);

// Delete user account
router.delete('/deleteAccount', auth, user.deleteAccount);

module.exports = router;