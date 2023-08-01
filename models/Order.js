const mongoose=require('mongoose')

const SingleCartSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        require:true,
    },
    price:{
        type: Number,
        required:true
    },
    amount:{
        type: Number,
        required:true
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required: true
    }
})


const OrderSchema=new mongoose.Schema({
    tax:{
        type:Number,
        required:[true,'Tax is Required'],
    },
    shippingFee:{
        type:Number,
        required:true,
    },
    subTotal:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    orderItems:[SingleCartSchema],
    status:{
        type: String,
        default:"Pending", 
        enum : ["Paid","Shipped",'Delivered','Cancelled',"Pending","Failed"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    clientSecret:{
        type:String,
        required:true
    },
},{timestamps:true});


module.exports=mongoose.model('Order',OrderSchema);