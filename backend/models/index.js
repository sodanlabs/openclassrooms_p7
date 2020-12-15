const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host            : dbConfig.HOST,
  dialect         : dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max    : dbConfig.pool.max,
    min    : dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle   : dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users    = require('./user.models')(sequelize, Sequelize);
db.messages = require('./message.models')(sequelize, Sequelize);
db.comments = require('./comment.models')(sequelize, Sequelize);

db.users.hasMany(db.messages, { as: "messages" });
db.messages.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.messages.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.messages, {
  foreignKey: "messageId",
  as: "message",
});

module.exports = db;