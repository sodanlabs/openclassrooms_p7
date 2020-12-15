// Imports
const express = require('express');
const router  = express.Router();

const auth   = require('../middleware/auth.middleware');
const multer = require('../middleware/multer.middleware');

const message = require('../controllers/message.controller');

router.get('/', auth, message.getAllMessages);
router.post('/', auth, multer, message.createMessage);
router.get('/:id', auth, message.getOneMessage);
router.put('/:id', auth, message.modifyMessage);
router.delete('/:id', auth, message.deleteMessage);

module.exports = router;