const multer = require('multer')
const DatauriParser = require('datauri/parser')
const path = require('path')

const storage = multer.memoryStorage()
const singleUpload = multer({
    storage: storage,
}).single('file')

const getDataUri = (file) => {
    const parser = new DatauriParser()
    const ext = path.extname(file.originalname).toString()
    return parser.format(ext, file.buffer)
}

module.exports = { singleUpload, getDataUri }
