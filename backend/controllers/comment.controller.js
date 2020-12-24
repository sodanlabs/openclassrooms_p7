// Imports
const db = require("../models");

const Op      = db.Sequelize.Op;
const Message = db.messages;
const Comment = db.comments;

// Retrieve all Comments from the database
exports.getAllComments = (req, res, next) => {
    Message.findOne({
        where: { id: `${req.params.messageId}` }
    })
        .then(messageFound => {
            Comment.findAll({
                where: { messageId: `${messageFound.id}` },
                attributes: ['id', 'userId', 'text']
            })
                .then(commentList => {

                    if (commentList.length == 0) {
                        return res.status(400).json({ error: 'comment does not exist' })
                    } else {
                        // Change CommentList <Array<Model>> to a simple Array
                        const mapCommentList = commentList.map(commentItem => {
                            return commentItem.dataValues;
                        })
                        mapCommentList.forEach(commentItem => {
                            if (res.locals.userId == commentItem.userId || res.locals.isAdmin == true) {
                                commentItem.userRights = true;
                            }
                        });
                        return res.status(200).json(commentList);
                    }
                })
                .catch(error => res.status(400).json({ error: 'comment are not exist' }));
        })
        .catch(error => res.status(400).json({ error: 'message does not exist' }));
};

// Create and Save a new Comment
exports.createComment = (req, res, next) => {

    // Params
    const userId    = res.locals.userId;
    const messageId = req.params.messageId;
    const text      = req.body.text;

    if (text == null) {
        return res.status(400).json({ error: 'missing parameters' });
    }

    if (text.length <= 3) {
        return res.status(400).json({ error: 'wrong text (at least 3 characters)' });
    }

    const comment = Comment.create({
        userId   : userId,
        messageId: messageId,
        text     : text
    })
        .then(() => res.status(201).json({ message: 'comment created !' }))
        .catch(error => res.status(400).json({ error }));
};

// Find a single Comment with an id
exports.getOneComment = (req, res, next) => {
    Message.findOne({
        where: { id: `${req.params.messageId}` }
    })
        .then(messageFound => {
            Comment.findOne({
                where: {
                    [Op.and]: [
                        { id: `${req.params.id}` },
                        { messageId: `${messageFound.id}` }]
                },
                attributes: ['userId', 'text']
            })
                .then(comment => {
                    if (comment == null) {
                        return res.status(400).json({ error: 'comment does not exist' });
                    } else {
                        return res.status(200).json(comment);
                    }
                })
                .catch(error => res.status(400).json({ error: 'comment does not exist' }));
        })
        .catch(error => res.status(400).json({ error: 'message does not exist' }));
};

// Update a Comment by the id in the request
exports.modifyComment = (req, res, next) => {

    const messageId = req.params.messageId;
    const commentId = req.params.id;

    Message.findOne({
        where: { id: `${messageId}` }
    })
        .then(messageFound => {
            Comment.findOne({
                where: {
                    [Op.and]: [
                        { id: `${commentId}` },
                        { messageId: `${messageFound.id}` }]
                }
            })
                .then(commentFound => {
                    if (commentFound == null) {
                        return res.status(400).json({ error: 'comment does not exist' });
                    } else {
                        if (commentFound.userId == res.locals.userId || res.locals.isAdmin == 1) {
                            Comment.update(req.body, {
                                where: { id: `${commentFound.id}` }
                            })
                                .then(() => res.status(201).json({ message: 'comment updated !' }))
                                .catch(error => res.status(400).json({ error: 'cannot update message' }));
                        } else {
                            return res.status(401).json({ error: 'cannot rights to modify comment' });
                        }
                    }
                })
                .catch(error => res.status(400).json({ error: 'comment does not exist' }));
        })
        .catch(error => res.status(400).json({ error: 'message does not exist' }));
};

// Delete a Comment with the specified id in the request
exports.deleteComment = (req, res, next) => {
    
    const messageId = req.params.messageId;
    const commentId = req.params.id;

    Message.findOne({
        where: { id: `${messageId}` }
    })
        .then(messageFound => {
            Comment.findOne({
                where: {
                    [Op.and]: [
                        { id: `${commentId}` },
                        { messageId: `${messageFound.id}` }]
                }
            })
                .then(commentFound => {
                    if (commentFound == null) {
                        return res.status(400).json({ error: 'comment does not exist' })
                    } else {
                        if (commentFound.userId == res.locals.userId || res.locals.isAdmin == 1) {
                            Comment.destroy({
                                where: { id: `${commentFound.id}` }
                            })
                                .then(() => res.status(201).json({ message: 'comment deleted !' }))
                                .catch(error => res.status(400).json({ error: 'cannot delete message' }));
                        } else {
                            return res.status(401).json({ error: 'cannot rights to delete comment' });
                        }
                    }
                })
                .catch(error => res.status(400).json({ error: 'comment does not exist' }));
        })
        .catch(error => res.status(400).json({ error: 'message does not exist' }));
};