const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



//create product--Admin

exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    
        const product= await Product.create(req.body);

        res.status(201).json({
            success:true,
            product
        })

})

//Get all products


exports.getAllProducts =catchAsyncErrors(async(req,res)=>{


const resultPerPage = 5;
const productCount = await Product.countDocuments();
    const apiFeatures=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products= await apiFeatures.query;

    
    res.status(200).json({success:true,products,productCount,})
})


//update product --Admin

exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{

    let product=Product.findById(req.params.id);
  if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    product=await Product.findByIdAndUpdate(
        req.params.id,
        req.body,{new:true,
    runValidators:true,
    useFindandModify:false});
    res.status(200).json({
        success:true,
        product
    })

})
//get single produc
exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    
    res.status(200).json({
        success:true,
        product
    })
})


//delete product --admin

exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
})
