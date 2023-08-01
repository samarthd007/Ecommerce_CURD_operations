const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please Provide a name'],
        minlength:3,
        maxlength:50
    }, 
    email:{
        type:String,
        required:[true,'please provide an email '],
        validate:{
            validator:validator.isEmail,
            message:'please provide a valid email ',

        },
        unique:true
    },
    passcode:{
        type:String,
        required:[true,'please provide a valid passcode '],
        minlength:5
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
});

UserSchema.pre('save', async function (next) {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    const salt = await bcrypt.genSalt(10);
    this.passcode =await bcrypt.hash(this.passcode, salt);
    next();
  });
  
  UserSchema.methods.comparePasscode = async function (canditatePassword) {
    const isMatch =await  bcrypt.compare(canditatePassword, this.passcode);
    return isMatch;
  };


module.exports=mongoose.model('User',UserSchema)