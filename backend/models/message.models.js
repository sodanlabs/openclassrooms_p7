module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        userId: {
            allowNull : false,
            type      : Sequelize.INTEGER,
            references: {
                model: 'users',
                key  : 'id'
            }
        },
        title: {
            allowNull: false,
            type     : Sequelize.STRING
        },
        description: {
            allowNull: false,
            type     : Sequelize.STRING
        },
        attachment: {
            allowNull: true,
            type     : Sequelize.STRING
        }
    });

    return Message;
};