module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        userId: {
            allowNull : false,
            type      : Sequelize.INTEGER,
            references: {
                model: 'users',
                key  : 'id'
            }
        },
        messageId: {
            allowNull : false,
            type      : Sequelize.INTEGER,
            references: {
                model: 'messages',
                key  : 'id'
            }
        },
        text: {
            allowNull: false,
            type     : Sequelize.TEXT
        }
    });

    return Comment;
};