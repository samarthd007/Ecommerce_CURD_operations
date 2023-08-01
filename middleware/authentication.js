const CustomError=require('../errors')
const { isTokenValid } = require('../utils/jwt')

const authenticateUser=async (req,res,next)=>{
    const token =req.signedCookies.token

    if(!token){
        throw new CustomError.UnauthenticatedError('Login or register is required')
    }

    try {
        const {name,userID,role}=isTokenValid({token});
        req.user={name,userID,role}
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Login or register is required');
    }
    
}

const authorizePermissions=(...roles)=>{

    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizeError('UnAuthorised access to this route')
        }
        next();
    }

}

module.exports={
    authenticateUser,
    authorizePermissions
}