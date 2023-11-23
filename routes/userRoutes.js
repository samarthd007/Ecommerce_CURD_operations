const express = require('express')
const router = express.Router()
const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/authentication')
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    updatePicture,
    forgetPassword,
    resetPassword,
    getUserInfo,
} = require('../controllers/userController')
const { singleUpload } = require('../middleware/multer')

router
    .route('/')
    .get(authenticateUser, authorizePermissions('admin'), getAllUsers)

router.route('/userinfo').get(authenticateUser, getUserInfo)

router.route('/showMe').get(authenticateUser, showCurrentUser)
router.route('/updateUser').put(authenticateUser, updateUser)
router.route('/updateUserPassword').put(authenticateUser, updateUserPassword)

router
    .route('/updatePicture')
    .put(authenticateUser, singleUpload, updatePicture)

router
    .route('/:id')
    .get(authenticateUser, authorizePermissions('admin'), getSingleUser)

router
    .route('/forgetPassword')
    .post(authenticateUser, forgetPassword)
    .put(authenticateUser, resetPassword)

module.exports = router
