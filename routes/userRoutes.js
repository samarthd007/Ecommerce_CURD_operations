const express=require('express')
const router=express.Router()
const { getAllUsers,
    getOneSingleUser,
    updateUser,
    updateUserPasscode,
    showCurrentUser}=require('../Controller/userController');
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

router.route('/updateUser').patch(authenticateUser,updateUser)


router.route('/').get(authenticateUser,authorizePermissions('admin','user'),getAllUsers);

router.route('/showMe').get(authenticateUser,showCurrentUser)

router.route('/:id').get(authenticateUser,getOneSingleUser);

router.route('/updatePasscode').patch(authenticateUser,updateUserPasscode)


module.exports=router