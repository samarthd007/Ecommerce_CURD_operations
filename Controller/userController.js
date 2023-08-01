const User=require('../models/User')
const CustomError=require('../errors');
const {createTokenUser,attachCookiesToResponse, checkPermissions}=require('../utils');
const { StatusCodes } = require('http-status-codes');

const getAllUsers=async (req,res)=>{

    const users=await User.find({role:'user'}).select('-passcode')
        if(!users){
            throw new CustomError.NotFoundError('No users found')
        }

        res.status(200).json({users})
}

const getOneSingleUser=async (req,res)=>{
    const user=await User.findOne({_id:req.params.id}).select('-passcode')

    if(!user){
        throw new CustomError.NotFoundError('No user found on : '+String(req.params.id))
    }
    checkPermissions(req.user,user._id)
    res.status(200).json({user})

}


const showCurrentUser=async (req,res)=>{
    res.status(201).json({user:req.user})
}

//method with .save() method
const updateUse=async (req,res)=>{
    const {email,name}=req.body
    if(!email ||!name){
        throw new CustomError.BadRequestError('provide email and name')
    }
    
    const users=await User.findOne({_id:req.user.userID});
    users.email=email;
    users.name=name;
    await users.save()

    const tokenUser=createTokenUser(users)
    attachCookiesToResponse({res,user:tokenUser})

    res.status(StatusCodes.OK).json({msg:tokenUser})
}

//method with findandupdate
const updateUser=async (req,res)=>{
    const {email,name}=req.body
    if(!email ||!name){
        throw new CustomError.BadRequestError('provide email and name')
    }
    const users=await User.findOneAndUpdate({_id:req.user.userID},{name,email},{
        runValidators:true,
        new:true,
    })

    const tokenUser=createTokenUser(users)
    attachCookiesToResponse({res,user:tokenUser})

    res.status(StatusCodes.OK).json({msg:tokenUser})
}


const updateUserPasscode=async (req,res)=>{
    const {oldpasscode,newpasscode}=req.body
    if(!oldpasscode ||!newpasscode){
        throw new CustomError.BadRequestError('please enter required credentials')
    }
    const users=await User.findOne({_id:req.user.userID})

    isPasscodeCorrect=await users.comparePasscode(oldpasscode);
    if(!isPasscodeCorrect){
        throw new CustomError.UnauthenticatedError('passcode did not match')
    }

    users.passcode=newpasscode;
    users.markModified('passcode');
    users.save();

    res.status(200).json({msg:'passcode updated'})
}

module.exports={
    getAllUsers,
    getOneSingleUser,
    updateUser,
    updateUserPasscode,
    showCurrentUser
}
