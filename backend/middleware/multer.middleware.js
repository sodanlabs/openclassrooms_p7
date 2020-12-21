const multer = require('multer');

const MIME_TYPES = {
  'image/jpg' : 'jpg',
  'image/jpeg': 'jpg',
  'image/png' : 'png',
  'image/gif' : 'gif'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // Replaces spaces with underscore and removes the file extension
    const name = file.originalname.split(' ').join('_').split('.').shift();
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + '_' + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage }).single('image');