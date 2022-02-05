const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");



//Register a user

exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:"this is sample id",
            url:"profilepicurl"
        }
    });

    sendToken(user,201,res)
})

//login user after jwt generated

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{

    const{email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("please enter email & password",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));

    }
    const isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    sendToken(user,200,res);

})


//logout User

exports.logout =catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
})

//forgot password

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await user.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    //Get reset passsword token
})