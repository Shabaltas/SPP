const fs = require('fs');
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'frontend/public/temp';
        if (!fs.existsSync(dir))
            fs.mkdir(dir, (err) => {console.log(err)});
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
});

module.exports.storage = storage;
module.exports.upload = multer({ storage: storage });