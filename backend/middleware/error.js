const ErrorHandler=require("../utils/errorhandler");


module.exports=(err,req,res,next)=>{
    err.statuscode=err.statuscode ||500;
    err.message=err.message||"internal server error";
    
    //wrong mongodb id error

    if(err.name==="CastError"){
        const message=`Resource notfound:${err.path}`;
        err= new ErrorHandler(message,400);
    }

    res.status(err.statuscode).json({
        success:false,
        message:err.message,
       

    })
}

