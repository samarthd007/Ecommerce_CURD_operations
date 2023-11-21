const mongoose = require('mongoose')

const SingleOrderItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
})

const OrderSchema = mongoose.Schema(
    {
        taxPrice: {
            type: Number,
            required: true,
        },
        shippingCharges: {
            type: Number,
            required: true,
        },
        itemsPrice: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        orderItems: [SingleOrderItemSchema],
        orderStatus: {
            type: String,
            enum: [
                'pending',
                'failed',
                'paid',
                'delivered',
                'canceled',
                'shipped',
            ],
            default: 'pending',
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        clientSecret: {
            type: String,
        },
        paymentMethod: {
            type: String,
            enum: ['COD', 'ONLINE'],
            default: 'COD',
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        deliveredAt: {
            type: Date,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)
