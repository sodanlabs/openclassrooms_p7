// Imports
const fs      = require('fs');
const db      = require("../models");

const Message = db.messages;
const Comment = db.comments;

// Retrieve all Messages from the database
exports.getAllMessages = (req, res, next) => {
    Message.findAll({
        attributes: ['id', 'userId', 'title', 'description', 'attachment']
    })
        .then(message => {
            if (message.length != 0) {
                return res.status(200).json(message);
            } else {
                return res.status(400).json({ error: 'message does not exist' });
            }
        })
        .catch(error => res.status(400).json({ error: 'messages are not exist' }));
};

// Create and Save a new Message
exports.createMessage = (req, res, next) => {

    // Params
    const title       = req.body.title;
    const description = req.body.description;
    const userId      = res.locals.userId;
    const attachment  = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

    if (title == null || description == null) {
        return res.status(400).json({ error: 'missing parameters' });
    } else if (title.length <= 3 || description.length <= 3) {
        return res.status(400).json({ error: 'wrong title or description (at least 3 characters)' });
    }

    Message.create({
        userId     : userId,
        title      : title,
        description: description,
        attachment : attachment,
    })
        .then(() => res.status(201).json({ message: 'message created !' }))
        .catch(error => res.status(400).json({ error: 'cannot add message' }));
};

// Find a single Message with an id
exports.getOneMessage = (req, res, next) => {
    Message.findOne({
        where: { id: `${req.params.id}` },
        attributes: ['id', 'userId', 'title', 'description', 'attachment']
    })
        .then(message => {
            if (message == null) {
                return res.status(400).json({ error: 'message does not exist' });
            } else {
                return res.status(200).json(message); 
            }
        })
        .catch(error => res.status(400).json({ error: 'message does not exist' }));
};

// Update a Message by the id in the request
exports.modifyMessage = (req, res, next) => {
    Message.findOne({
        where: { id: `${req.params.id}` }
    })
        .then(messageFound => {
            if (messageFound.userId == res.locals.userId || res.locals.isAdmin == true) {
                if (req.file) {
                    if (messageFound.attachment != null) {
                        const filename = messageFound.attachment.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => { });
                    }
                    req.body.attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                }
                Message.update(req.body, {
                    where: { id: `${req.params.id}` }
                })
                    .then(() => res.status(201).json({ message: 'message updated !' }))
                    .catch(error => res.status(400).json({ error: 'cannot update message' }));
            } else {
                return res.status(401).json({ error: 'cannot right to modify message' });
            }
        })
        .catch(error => res.status(400).json({ error: 'message does not exist' }));
};

// Delete a Message with the specified id in the request
exports.deleteMessage = (req, res, next) => {
    Message.findOne({
        where: { id: `${req.params.id}` }
    })
        .then(messageFound => {
            if (messageFound.userId == res.locals.userId || res.locals.isAdmin == 1) {
                // First, delete the comments associated with the message
                Comment.destroy({
                    where: { messageId: `${messageFound.id}` }
                })
                    .then(() => {
                        // Then delete the message
                        Message.destroy({
                            where: { id: `${messageFound.id}` }
                        })
                            .then(() => {
                                if (messageFound.attachment != null) {
                                    const filename = messageFound.attachment.split('/images/')[1];
                                    fs.unlink(`images/${filename}`, () => { });
                                }
                                return res.status(201).json({ message: 'message deleted with all the comments !' })
                            })
                            .catch(error => res.status(400).json({ error: 'cannot delete message' }));
                    })
                    .catch(error => res.status(400).json({ error: 'cannot delete comments associated with the message' }));

            } else {
                return res.status(401).json({ error: 'cannot rights to delete message' });
            }
        })
        .catch(error => res.status(400).json({ error: 'message does not exist' }));
};