const CustomError=require('../errors')

const checkPermissions=(requestUser,requestUserID)=>{
    if(requestUser.role !== 'admin'){
        if(requestUser.userID !== requestUserID.toString()) {
            throw new CustomError.UnauthorizeError('not authorized to acess this role')
        }   
    }
    else{
        return;
    }
    
}
module.exports={checkPermissions};  //exporting the function

