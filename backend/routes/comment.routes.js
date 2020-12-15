// Imports
const express = require('express');
const router  = express.Router();

const auth = require('../middleware/auth.middleware');

const comment = require('../controllers/comment.controller');

router.get('/:messageId/comment/', auth, comment.getAllComments);
router.post('/:messageId/comment/', auth, comment.createComment);
router.get('/:messageId/comment/:id', auth, comment.getOneComment);
router.put('/:messageId/comment/:id', auth, comment.modifyComment);
router.delete('/:messageId/comment/:id', auth, comment.deleteComment);

module.exports = router;