const multer = require('multer');
const path = require('path');
const { SERVER_ERROR, BAD_GATEWAY } = require('../helper/status-codes');
const { ErrorHandler } = require('../helper');
const fs = require('fs').promises;
// Set storage engine
const tempStorage = multer.diskStorage({
    destination: './tempUploads/', // Temporary location
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: tempStorage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

async function verifyFileContent(file) {
    try {
        const { fileTypeFromBuffer } = await import('file-type');
    
        const buffer = await fs.readFile(file.path);
        const type = await fileTypeFromBuffer(buffer);
    
        if (type && /jpeg|jpg|png|gif/.test(type.ext)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw new ErrorHandler(err.statusCode, err.message);
        throw new ErrorHandler(SERVER_ERROR, err);
    }
}

async function moveFile(file, dest) {
    try {
        await fs.rename(file.path, path.join(dest, path.basename(file.path)));
    } catch (err) {
        throw err;
    }
}
module.exports ={ upload,verifyFileContent,moveFile};
