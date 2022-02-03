const Product = require("../models/productModel");



//create product--Admin

exports.createProduct = async(req,res,next)=>{
    
        const product= await Product.create(req.body);

        res.status(201).json({
            sucess:true,
            product
        })

}

//Get all products


exports.getAllProducts =async(req,res)=>{

    const products =await Product.find()
    res.status(200).json({sucess:true,products})
}


//update product --Admin

exports.updateProduct=async(req,res,next)=>{

    let product=Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            sucess:false,
            message:"product not found"
        })
    }
    product=await Product.findByIdAndUpdate(
        req.params.id,
        req.body,{new:true,
    runValidators:true,
    useFindandModify:false});
    res.status(200).json({
        sucess:true,
        product
    })

}

//delete product --admin

exports.deleteProduct=async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            sucess:false,
            message:"product not found"
        })
    }
    await product.remove();
    res.status(200).json({
        sucess:true,
        message:"product deleted sucessfully"
    })
}
