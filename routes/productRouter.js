const express=require('express')
const router=express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const {
    getAllProduct,
    createProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    uploadImage
}=require('../Controller/productController');
const { getSingleProductReview } = require('../Controller/reviewController');


router.route('/').post([authenticateUser,authorizePermissions('admin')],createProduct).get(getAllProduct);

router.route('/uploadimage').post([authenticateUser,authorizePermissions('admin')],uploadImage); 

router.route('/:id').get(getSingleProduct).patch([authenticateUser,authorizePermissions('admin')],updateProduct)
.delete([authenticateUser,authorizePermissions('admin')],deleteProduct);

router.route('/:id/reviews').get(getSingleProductReview);

module.exports=router;

