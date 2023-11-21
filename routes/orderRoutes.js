const express = require('express')
const router = express.Router()
const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/authentication')

const {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
    processOrder,
    processPayment,
} = require('../controllers/orderController')

router
    .route('/')
    .post(authenticateUser, createOrder)
    .get(authenticateUser, authorizePermissions('admin'), getAllOrders)

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders)

router
    .route('/singleorder/:id')
    .get(authenticateUser, getSingleOrder)
    .patch(authenticateUser, updateOrder)

router
    .route('/orderstatus/:id')
    .put(authenticateUser, authorizePermissions('admin'), processOrder)

router.route('/payment').post(authenticateUser, processPayment)

module.exports = router
