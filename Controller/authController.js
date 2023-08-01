const User=require('../models/User');
const CustomError=require('../errors');
const jwt=require('jsonwebtoken')
const {createJwt, attachCookiesToResponse,createTokenUser}=require('../utils')


const register=async (req,res)=>{

    const {name,email,passcode}=req.body
    const emailAlreadyExist=await User.findOne({email})

    if(emailAlreadyExist){
        throw new CustomError.BadRequestError('Email already exist')
    }

    const isFirstAccount=(await User.countDocuments({}))===0;
    const role =isFirstAccount?'admin':'user';

    const user=await User.create({name,email,passcode,role});

    const tokenUser=createTokenUser(user);

    attachCookiesToResponse({res,user:tokenUser})

    res.status(201).json({user:tokenUser})
}

const login=async (req,res)=>{
    const {email,passcode}=req.body;

    if(!email||!passcode){
        throw new CustomError.BadRequestError('please provide required credentials')
    }

    const user=await User.findOne({email})

    if(!user){
        throw new CustomError.UnauthenticatedError('please provide correct mail-Id')
    }

    const isPasscodeCorrect=await user.comparePasscode(passcode)
    
    if(!isPasscodeCorrect){
        throw new CustomError.UnauthenticatedError('invalid passcode')
    }


    const tokenUser=createTokenUser(user);;

    attachCookiesToResponse({res,user:tokenUser})

    res.status(201).json({user:tokenUser})

}

const logout=async (req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now()),
    })

    res.status(200).json({
        msg:'user logout'
    })

}


module.exports={
    register,
    login,
    logout
}