const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"please enter your name"],
        maxlength:[30,"name cannot exceed 30 character"],
        minlength:[4,"Name should have more than 5 characters"]
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"please enter a valid email"],

    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minlength:[8,"passord should have more than 8 characters"],
        select:false,

    },
    avatar:{
        
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
          },
    role:{
        type:String,
        default:"user",

    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    
    

})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }


    this.password= await bcrypt.hash(this.password,10)
})

//JWT token

userSchema.methods.getJWTToken=function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE,}
    )
}

//compare password 
userSchema.methods.comparePassword= async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password)

}

module.exports=mongoose.model("User",userSchema);