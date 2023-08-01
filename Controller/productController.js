const { StatusCodes } = require('http-status-codes')
const Product=require('../models/Product')
const CustomError=require('../errors')
const path=require('path')

const createProduct=async (req,res)=>{
    req.body.user=req.user.userID;
    const product=await Product.create(req.body)

    res.status(StatusCodes.CREATED).json({product})

}

const getAllProduct=async (req,res)=>{
    const product=await Product.find({})

    res.status(StatusCodes.OK).json({product,count:product.length})
}

const getSingleProduct=async (req,res)=>{
    const {id:productID}=req.params

    const product=await Product.findOne({_id:productID}).populate('reviews')

    if(!product){
        throw new CustomError.NotFoundError(' product with id: '+String(productID)+' not found')
    }

    res.status(StatusCodes.OK).json({product})
}

const updateProduct=async (req,res)=>{
    const {id:productID}=req.params

    const product=await Product.findOneAndUpdate({_id:productID},req.body,{new:true,runValidators:true})

    if(!product){
        throw new CustomError.NotFoundError(' product with id: '+String(productID)+' not found')
    }

    res.status(StatusCodes.OK).json({product})


}

const deleteProduct=async (req,res)=>{
    const {id:productID}=req.params
    const product=await Product.findOne({_id:productID})

    if(!product){
        throw new CustomError.NotFoundError(' product with id: '+String(productID)+' not found')
    }

    await product.remove();
    res.status(StatusCodes.OK).json({msg:'Sucess !'})


}

const uploadImage=async (req,res)=>{
    if(!req.files){
        throw new CustomError.BadRequestError('No file uploaded')
    }
    

    const productImage=req.files.image;
    if(! productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('please upload image')
    }
    const maxSize=1024*1024;

    if(productImage.size>maxSize){
        throw new CustomError.BadRequestError('File size should be less than 1MB')
    }
    const imagePath=path.join(__dirname,'../public/uploads/'+String(productImage.name))

    await productImage.mv(imagePath)

    res.status(StatusCodes.OK).json({image:'uploads/'+String(productImage.name)})

}

module.exports={
    getAllProduct,
    createProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    uploadImage
}