const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Please provide product name'],
            maxlength: [100, 'Name can not be more than 100 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide product price'],
            default: 0,
        },
        description: {
            type: String,
            required: [true, 'Please provide product description'],
            maxlength: [
                1000,
                'Description can not be more than 1000 characters',
            ],
        },
        images: [
            {
                public_id: String,
                url: String,
            },
        ],
        category: {
            type: mongoose.Types.ObjectId,
            required: [true, 'Please provide product category'],
            ref: 'Category',
        },
        company: {
            type: String,
            enum: {
                values: ['ikea', 'liddy', 'marcos'],
                message: '{VALUE} is not supported',
            },
        },
        featured: {
            type: Boolean,
            default: false,
        },
        freeShipping: {
            type: Boolean,
            default: false,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
        stock: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
})

ProductSchema.pre('remove', async function (next) {
    await this.model('Review').deleteMany({ product: this._id })
})

module.exports = mongoose.model('Product', ProductSchema)
