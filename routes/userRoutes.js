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
} = require('../controllers/userController')
const { singleUpload } = require('../middleware/multer')

router
    .route('/')
    .get(authenticateUser, authorizePermissions('admin'), getAllUsers)

router.route('/showMe').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)

router
    .route('/updatePicture')
    .patch(authenticateUser, singleUpload, updatePicture)

router
    .route('/:id')
    .get(authenticateUser, authorizePermissions('admin'), getSingleUser)

router
    .route('/forgetPassword')
    .post(authenticateUser, forgetPassword)
    .patch(authenticateUser, resetPassword)

module.exports = router
