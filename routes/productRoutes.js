const express = require('express')
const router = express.Router()
const {
    authenticateUser,
    authorizePermissions,
} = require('../middleware/authentication')

const {
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
} = require('../controllers/productController')

const { getSingleProductReviews } = require('../controllers/reviewController')
const { singleUpload } = require('../middleware/multer')
const {
    addCategory,
    getAllCategories,
    deleteCategory,
} = require('../controllers/categoryController')

router
    .route('/')
    .post(
        [authenticateUser, authorizePermissions('admin')],
        singleUpload,
        createProduct
    )

router.route('/all').get(getAllProducts)

router.route('/all/byfilter').get(getAllProductsWithCategory)

router
    .route('/uploadImage')
    .post([authenticateUser, authorizePermissions('admin')], uploadImage)

router
    .route('/:id')
    .get(getSingleProduct)
    .put([authenticateUser, authorizePermissions('admin')], updateProduct)
    .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)

router.route('/:id/reviews').get(getSingleProductReviews)

router
    .route('/adminproducts/getproducts')
    .get([authenticateUser, authorizePermissions('admin')], getAdminProduct)

router
    .route('/images/:id')
    .post(
        [authenticateUser, authorizePermissions('admin')],
        singleUpload,
        addProductImages
    )
    .delete(
        [authenticateUser, authorizePermissions('admin')],
        singleUpload,
        deleteImage
    )

router
    .route('/category/categories')
    .post([authenticateUser, authorizePermissions('admin')], addCategory)
    .get(getAllCategories)

router
    .route('/category/categories/:id')
    .delete([authenticateUser, authorizePermissions('admin')], deleteCategory)

module.exports = router
