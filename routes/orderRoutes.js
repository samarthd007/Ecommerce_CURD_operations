const express=require('express')
const router=express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const { getAllOrder, getCurrentUserOrder, getoneOrder, createOrder, updateOrder } = require('../Controller/orderController');

router.route('/').post(authenticateUser,createOrder).get(authenticateUser,authorizePermissions('admin'),getAllOrder)

router.route('/showallmyorders').get(authenticateUser,getCurrentUserOrder)

router.route('/:id').get(authenticateUser,getoneOrder).patch(authenticateUser,updateOrder);


module.exports=router