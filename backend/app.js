// Imports
const express    = require("express");
const bodyParser = require("body-parser");
const cors       = require("cors");
const path       = require('path');

// Instantiate server
const app = express();

// Models
const db = require("./models");

// Routes
const userRoutes    = require('./routes/user.routes');
const messageRoutes = require('./routes/message.routes');
const commentRoutes = require('./routes/comment.routes');

// db.sequelize.sync() with drop of DB;
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

// Cors
const corsOptions = { origin: "http://localhost:8080" };
app.use(cors(corsOptions));

/*
// Header CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
*/

// Body Parser - requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Body Parser - requests of content-type - application/json  
app.use(bodyParser.json());

// Folder path to keep images
app.use('./images', express.static(path.join(__dirname, 'images')));

// Instantiate routes
app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/message', commentRoutes);

module.exports = app;