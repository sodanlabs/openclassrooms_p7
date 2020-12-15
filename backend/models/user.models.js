module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            allowNull: false,
            type     : Sequelize.STRING,
            unique   : true
        },
        username: {
            allowNull: false,
            type     : Sequelize.STRING
        },
        password: {
            allowNull: false,
            type     : Sequelize.STRING
        },
        isAdmin: {
            allowNull: false,
            type     : Sequelize.BOOLEAN
        }
    });

    return User;
};