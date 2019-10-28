const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimeType === 'image/png' || file.mimeType === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const limits = {
    fileSize: 1024 * 1024 * 5
};

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
});
