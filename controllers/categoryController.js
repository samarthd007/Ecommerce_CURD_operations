const Category = require('../models/Category')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const Product = require('../models/Product')

const addCategory = async (req, res, next) => {
    const { category } = req.body

    const categories = await Category.findOne({ category })

    if (categories) {
        throw new CustomError.BadRequestError(
            `Category already exist : ${category}`
        )
    }

    await Category.create({ category })

    res.status(StatusCodes.OK).json({
        message: 'category created successfully',
        success: true,
    })
}

const getAllCategories = async (req, res, next) => {
    const categories = await Category.find({})

    if (!categories) {
        throw new CustomError.NotFoundError(` No Category Present `)
    }

    res.status(StatusCodes.OK).json({
        categories: categories,
        success: true,
    })
}

const deleteCategory = async (req, res, next) => {
    const categories = await Category.findById({ _id: req.params.id })

    if (!categories) {
        throw new CustomError.NotFoundError(` No Category Present `)
    }

    const products = await Product.find({ category: categories._id })

    for (let i = 0; i < products.length; i++) {
        const product = products[i]
        product.category = undefined
        await products.save()
    }

    await categories.remove()

    res.status(StatusCodes.OK).json({
        message: 'category deleted successfully',
        success: true,
    })
}

module.exports = {
    deleteCategory,
    getAllCategories,
    addCategory,
}
