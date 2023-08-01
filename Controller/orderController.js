const Order=require('../models/Order')
const Product=require('../models/Product')
const StatusCode=require('http-status-codes')
const CustomError=require('../errors')
const {checkPermissions}=require('../utils')

const fakeStripeAPI=async({amount ,currency})=>{
    const client_secret='someRandomValue';
    return {client_secret,amount};
}

const createOrder=async(req,res)=>{
    const {items:cartItems,tax,shippingFee}=req.body

    if(!cartItems ||cartItems.length<1){
        throw new CustomError.BadRequestError('No cart items provided')
    }

    if(!tax ||!shippingFee){
        throw new CustomError.BadRequestError('Please provide tax and shipping fee ')
    }

    let orderItems=[]
    let subtotal=0;

    for(const item of cartItems){
        const dbProduct=await Product.findOne({_id:item.product})
        if(!dbProduct){
            throw new CustomError.BadRequestError(`no product found with id :${item.product}`)
        }
        const {name,price,image,_id}=dbProduct
        const singleOrderItem={
            amount:item.amount,
            name,price,image,product:_id
        }
        orderItems=[...orderItems,singleOrderItem]
        //calculate subtotal
        subtotal+=item.amount+price

    }
    const total=tax+shippingFee+subtotal
    const paymentIntent =await fakeStripeAPI({
        amount:total,currency:'usd'
    })  

    const order=await Order.create({
        orderItems,total,subtotal,shippingFee,tax,clientSecret:paymentIntent.client_secret,user:req.user.userID,subTotal:subtotal
    })

    res.status(StatusCode.CREATED).json({order,clientSecret:order.clientSecret})
}

const getAllOrder=async(req,res)=>{

    const order=await Order.find({})
    res.status(200).json({order,count:order.length})
}

const getoneOrder=async(req,res)=>{
    const {id:orderID}=req.params
    const order=await Order.findOne({_id:orderID})

    if(!order){
        throw new CustomError.BadRequestError(`No order with ID: ${orderID}`)
    }

    checkPermissions(req.user,order.user)

    res.status(200).json({order})
}

const getCurrentUserOrder=async(req,res)=>{
    const order=await Order.find({user:req.user.userID})

    res.status(200).json({order,count:order.length})
}

const updateOrder=async(req,res)=>{
    const {id:orderID}=req.params
    const {paymentIntentID}=req.body
    const order=await Order.findOne({_id:orderID})

    if(!order){
        throw new CustomError.BadRequestError(`No order with ID: ${orderID}`)
    }

    checkPermissions(req.user,order.user)

    order.status='Paid'
    await order.save()
    
    res.status(200).json({order})
}

module.exports={
    createOrder,
    getAllOrder,
    getoneOrder,
    getCurrentUserOrder,
    updateOrder
}