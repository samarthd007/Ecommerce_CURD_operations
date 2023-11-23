const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path')
const { getDataUri } = require('../middleware/multer')

const cloudinary = require('cloudinary')

const createProduct = async (req, res) => {
    req.body.user = req.user.userId
    const { name, description, category, price, stock } = req.body

    const file = getDataUri(req.file)
    const myCloud = await cloudinary.v2.uploader.upload(file.content)
    const image = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    }

    const product = await Product.create({
        name,
        description,
        category,
        price,
        images: [image],
        stock,
        user: req.user.userId,
    })
    res.status(StatusCodes.CREATED).json({ product, success: true })
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    if (!products) {
        throw new CustomError.NotFoundError('No  products found')
    }
    res.status(StatusCodes.OK).json({ products, success: true })
}
const getAllProductsWithCategory = async (req, res) => {
    const { keyword, category } = req.query

    const products = await Product.find({
        name: {
            $regex: keyword ? keyword : '',
            $options: 'i',
        },
        category: category ? category : undefined,
    })

    if (!products) {
        throw new CustomError.NotFoundError('No  products found')
    }

    res.status(StatusCodes.OK).json({
        products,
        count: products.length,
        success: true,
    })
}

const getAdminProduct = async (req, res) => {
    const product = await Product.find({ user: req.user.userId }).populate(
        'category'
    )

    const outOfStock = product.filter((i) => i.stock === 0)

    if (!product) {
        throw new CustomError.NotFoundError(
            `No product with Admin id : ${req.user.userId}`
        )
    }

    res.status(StatusCodes.OK).json({
        product,
        success: true,
        outOfStock: outOfStock.length,
        inStock: product.length - outOfStock.length,
    })
}

const getSingleProduct = async (req, res) => {
    const { id: productId } = req.params

    const product = await Product.findOne({ _id: productId }).populate(
        'reviews'
    )

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }

    res.status(StatusCodes.OK).json({ product, success: true })
}
const updateProduct = async (req, res) => {
    const { id: productId } = req.params

    const product = await Product.findOneAndUpdate(
        { _id: productId },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }

    product.user = req.user.userId
    await product.save()

    res.status(StatusCodes.OK).json({
        message: 'succedfully updated',
        success: true,
        product: product,
    })
}
const deleteProduct = async (req, res) => {
    const { id: productId } = req.params

    const product = await Product.findOne({ _id: productId })

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }

    for (let index = 0; index < product.images.length; index++) {
        await cloudinary.v2.uploader.destroy(product.images[index].public_id)
    }

    await product.remove()
    res.status(StatusCodes.OK).json({
        msg: 'Success! Product removed.',
        success: true,
    })
}
const uploadImage = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError('No File Uploaded')
    }
    const productImage = req.files.image

    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload Image')
    }

    const maxSize = 1024 * 1024

    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError(
            'Please upload image smaller than 1MB'
        )
    }

    const imagePath = path.join(
        __dirname,
        '../public/uploads/' + `${productImage.name}`
    )
    await productImage.mv(imagePath)
    res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
}

const addProductImages = async (req, res) => {
    if (!req.file) {
        throw new CustomError.BadRequestError('No file uploaded')
    }

    const { id: productId } = req.params

    const product = await Product.findOne({ _id: productId })
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }

    const file = getDataUri(req.file)
    const myCloud = await cloudinary.v2.uploader.upload(file.content)
    const image = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    }

    product.images.push(image)
    product.user = req.user.userId
    await product.save()

    res.status(StatusCodes.OK).json({
        message: `Image uploaded successfully`,
        success: true,
    })
}

const deleteImage = async (req, res) => {
    const { id: productId } = req.params
    const id = req.query.id

    if (!id) {
        throw new CustomError.BadRequestError('Product Image Id is required')
    }

    const product = await Product.findOne({ _id: productId })
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }

    let isExist = -1

    product.images.forEach((item, index) => {
        if (item._id.toString() === id.toString()) {
            isExist = index
        }
    })

    if (isExist < 0) {
        throw new CustomError.BadRequestError("This image doesn't exist")
    }

    await cloudinary.v2.uploader.destroy(product.images[isExist].public_id)
    product.images.splice(isExist, 1)
    product.user = req.user.userId
    await product.save()

    res.status(StatusCodes.OK).json({
        message: `Image Deleted successfully`,
        success: true,
    })
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    addProductImages,
    deleteImage,
    getAdminProduct,
    getAllProductsWithCategory,
}
