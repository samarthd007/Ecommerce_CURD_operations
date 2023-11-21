const express = require('express')
const router = express.Router()

const { register, login, logout } = require('../controllers/authController')
const { singleUpload } = require('../middleware/multer')

router.post('/register', singleUpload, register)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router
