const { register, login, logout } = require('../Controller/authController')

const express=require('express')
const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)

module.exports=router;

