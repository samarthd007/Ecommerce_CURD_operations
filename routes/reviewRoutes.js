const express=require('express')
const router=express.Router()

const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const { createRiview, getAllReviews, getSingleReview, updateRiewes, deleteReview } = 
require('../Controller/reviewController');

router.route('/').post(authenticateUser,createRiview).get(getAllReviews);

router.route('/:id').get(getSingleReview).patch(authenticateUser,updateRiewes).delete(authenticateUser,deleteReview);

module.exports=router


