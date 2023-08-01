const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema=new Schema({

    name:{
        type:String,
        required:[true,'Name is Required'],
        trim:true,
        maxlength : [50,"Maximum length of Name should be 20"],
    },
    price:{
        type:Number,
        default:10,
        required:[true,'please provide product price']
    },
    description:{
        type: String,
        minlength:3,
        maxLength:4096,
        required: [true,'please provide description']
    },
    image:{
        type:String,
        //required: true,
        default:'/uploads/example.jpeg'
    },
    category:{
        type:String,
        enum:['office','kitchen','bedroom'],
        lowercase:true,
        required:[true,'please provide a category']
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','marcos'],
            message:'{VALUE} not supported'
        },
        lowercase:true,
        required:[true,'please provide a company']
    },
    colors:{
        type:[String],
        required:true,
        default:['#222']

    },
    featured:{
        type:Boolean,
        default:false
    },
    freeshipping:{
        type:Boolean,
        default: false
    },
    inventory:{
        type: Number,
        required:true,
        default:15
    },
    averageRating:{
        type:Number,
        max: 5.0,
        min: 0.0,
        default:0   
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}}
);

ProductSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'product',
    justOne:false
})

ProductSchema.pre('remove',async function(next){
    await this.model('Remove').deleteMany({product:this._id})
    next(); 
})


module.exports=mongoose.model('Product',ProductSchema);