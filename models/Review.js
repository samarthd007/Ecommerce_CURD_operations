const mongoose=require('mongoose')


const ReviewSchema = mongoose.Schema({
    rating:{
        type:Number,
        required:[true,'Please provide a valid review'],
        min :1,
        max:5
    },
    title:{
        type:String,
        maxlength: [20,"Title should be less than 20 characters"],
        trim:true,
        required:[true,"Review Title is Required"]
    },
    comment:{
        type: String,
        maxLength: 300,
        required:[true,'please provide comment']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required: true
    }
},{timestamps:true})

ReviewSchema.index({product:1,user:1},{unique:true});

ReviewSchema.statics.calculateAverageRating=async function(productID){
    const result=await this.aggregate([
        {
            $match:{product:productID}
        },
        {
            $group:{
                _id:null,averageRating:{$avg:'$rating'},numOfReviews:{$sum:1}
            }
        }
    ]);
    try {
        await this.model('Product').findOneAndUpdate({_id:productID},{
            averageRating:Math.ceil(result[0]?.averageRating ||0),
            numOfReviews:result[0]?.numOfReviews||0
        })
    } catch (error) {
        
    }
}

ReviewSchema.post('save',async function(){
    await this.constructor.calculateAverageRating(this.product);
    
})

ReviewSchema.post('remove',async function(){
    await this.constructor.calculateAverageRating(this.product); 
})


module.exports=mongoose.model('Review',ReviewSchema);