const jwt=require('jsonwebtoken')

require("dotenv").config()

const authentication=(req,res,next)=>{

    const token = req.headers?.authorization?.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      if (decoded) {
        const userID = decoded.userID;
        req.body.userID = userID;
        next();
      } else {
        res.send("Please login");
      }
    } else {
      res.send("Please login");
    }
    // if(!req.headers.authorization){
    //     return res.send({"msg":"please login again"})

    // }
    // const token=req.headers.authorization.split(" ")[1]
    // jwt.verify(token,process.env.PRIVATE_KEY, function(err,decoded){
    //     if(err){
    //         res.send("please login")
    //     }else{
    //         req.body.userId=decoded.userId
    //         next()
    //     }
    // });
}

module.exports={authentication}