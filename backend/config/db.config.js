const dotenv = require('dotenv').config();

// IMPORT CONFIG FROM DOTENV ?

module.exports = {
  HOST    : "localhost",
  USER    : "developer",
  PASSWORD: "password",
  DB      : "groupomania_dev",
  dialect : "mysql",
  pool    : {
    max    : 5,
    min    : 0,
    acquire: 30000,
    idle   : 10000
  }
};