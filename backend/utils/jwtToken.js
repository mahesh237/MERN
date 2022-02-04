//create Token and saving in cookie

const sendToken=(user,stauscode,res)=>{
    const token=user.getJWTToken();

    //options for cookie
    const option={
        expires:new Date(Date.now+process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    };

    res.status(stauscode).cookie('token',token,option).json({
        success:true,
        user,
        token,
    })
};

module.exports=sendToken;