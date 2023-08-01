const Review=require('../models/Review')
const Product=require('../models/Product')
const StatusCode=require('http-status-codes')
const CustomError=require('../errors')
const {checkPermissions}=require('../utils')

const createRiview=async (req,res)=>{
    const {product:productID}=req.body

    const isvalidProduct=await Product.findOne({_id:productID});
    if(!isvalidProduct){
        throw new CustomError.NotFoundError(`no product found with id ${productID}`)
    }
    req.body.userID=req.user.userID

    const isReviewValid=await Review.findOne({product:productID,user:req.body.userID})

    if(isReviewValid){
        throw new CustomError.BadRequestError(` review already done for this product`)
    }

    const review=await Review.create(req.body)

    res.status(StatusCode.CREATED).json({review})
}

const getAllReviews=async (req,res)=>{

    const review=await Review.find({}).populate({path:'product',select:'name company price'}).
    populate({path:'user',select:'name'});

    res.status(StatusCode.OK).json({review})
}

const getSingleReview=async (req,res)=>{
    const {id:reviewID}=req.params;
    const review=await Review.findOne({_id:reviewID})
    if(!review){
        throw new CustomError.NotFoundError(`No such review with id ${reviewID}`)
    }
    res.status(StatusCode.OK).json({review})
}

const updateRiewes=async (req,res)=>{

    const {id:reviewID}=req.params;
    const {rating,comment,title}=req.body

    const review=await Review.findOne({_id:reviewID})

    if(!review){
        throw new CustomError.NotFoundError(`No such review with id ${reviewID}`)
    }

    checkPermissions(req.user,review.user)

    review.rating=rating;
    review.comment=comment;
    review.title=title

    await review.save();
    res.status(StatusCode.OK).json({review})
}

const deleteReview=async (req,res)=>{
    const {id:reviewID}=req.params
    const review=await Review.findOne({_id:reviewID})
    if(!review){
        throw new CustomError.NotFoundError(`No such review with id ${reviewID}`)
    }

    checkPermissions(req.user,review.user)

    await review.remove();

    res.status(StatusCode.OK).json({msg:`sucess...`})
}

const getSingleProductReview=async(req,res)=>{
    const {id:productID}=req.params
    const reviews=await Review.find({product:productID})
    res.status(StatusCode.OK).json({reviews,count:reviews.length});
}

module.exports={
    createRiview,
    getAllReviews,
    getSingleReview,
    updateRiewes,
    deleteReview,
    getSingleProductReview,
}