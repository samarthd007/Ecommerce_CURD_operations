const Order = require('../models/Order')
const Product = require('../models/Product')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_API_SECRET)

const fakeStripeAPI = async ({ amount, currency }) => {
    const client_secret = 'someRandomValue'
    return { client_secret, amount }
}

const createOrder = async (req, res) => {
    const {
        items: orderItems,
        city,
        country,
        pincode,
        taxPrice,
        shippingCharges,
        itemsPrice,
        totalAmount,
        address,
        paymentMethod,
        clientSecret,
        paymentInfo,
    } = req.body

    if (!orderItems || orderItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided')
    }
    if (!taxPrice || !shippingCharges) {
        throw new CustomError.BadRequestError(
            'Please provide tax and shipping fee'
        )
    }

    // let orderItems = []
    // let subtotal = 0

    // for (const item of cartItems) {
    //     const dbProduct = await Product.findOne({ _id: item.product })
    //     if (!dbProduct) {
    //         throw new CustomError.NotFoundError(
    //             `No product with id : ${item.product}`
    //         )
    //     }
    //     const { name, price, image, _id } = dbProduct
    //     const singleOrderItem = {
    //         amount: item.amount,
    //         name,
    //         price,
    //         image,
    //         product: _id,
    //     }
    //     // add item to order
    //     orderItems = [...orderItems, singleOrderItem]
    //     // calculate subtotal
    //     subtotal += item.amount * price
    // }
    // // calculate total
    // const total = tax + shippingFee + subtotal
    // // get client secret

    const order = await Order.create({
        orderItems,
        city,
        country,
        pincode,
        taxPrice,
        shippingCharges,
        itemsPrice,
        totalAmount,
        address,
        paymentMethod,
        clientSecret,
        paymentInfo,
        user: req.user.userId,
    })

    for (let i = 0; i < orderItems.length; i++) {
        const product = await Product.findById({ _id: orderItems[i].product })
        product.stock -= orderItems[i].quantity
        await product.save()
    }

    res.status(StatusCodes.CREATED).json({
        message: 'Order Created scccuessfully',
        success: true,
        order: order,
    })
}
const getAllOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.userId })
    res.status(StatusCodes.OK).json({
        success: true,
        orders,
        count: orders.length,
    })
}
const getSingleOrder = async (req, res) => {
    const { id: orderId } = req.params
    const order = await Order.findOne({ _id: orderId })
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id : ${orderId}`)
    }
    checkPermissions(req.user, order.user)
    res.status(StatusCodes.OK).json({ success: true, order: order })
}
const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.userId })
    res.status(StatusCodes.OK).json({
        orders,
        count: orders.length,
        success: true,
    })
}
const updateOrder = async (req, res) => {
    const { id: orderId } = req.params
    const { paymentMethod } = req.body

    const order = await Order.findOne({ _id: orderId })
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id : ${orderId}`)
    }
    checkPermissions(req.user, order.user)

    order.paymentMethod = paymentMethod
    order.orderStatus = 'paid'
    await order.save()

    res.status(StatusCodes.OK).json({ order, success: true })
}

const processOrder = async (req, res) => {
    const { id: orderId } = req.params

    const order = await Order.findOne({ _id: orderId })
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id : ${orderId}`)
    }
    checkPermissions(req.user, order.user)

    if (order.orderStatus === 'pending') {
        order.orderStatus = 'shipped'
    } else if (order.orderStatus === 'shipped') {
        order.orderStatus = 'delivered'
    } else {
        return res.status(403).send('Invalid status transition')
    }
    await order.save()

    res.status(StatusCodes.OK).json({
        order,
        message: 'order delivered',
        success: true,
    })
}

const processPayment = async (req, res) => {
    const { totalAmount } = req.body
    const { client_secret } = await stripe.paymentIntents.create({
        amount: Number(totalAmount * 100),
        currency: 'inr',
    })

    res.status(StatusCodes.CREATED).json({
        success: true,
        client_secret,
    })
}

module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
    processOrder,
    processPayment,
}
