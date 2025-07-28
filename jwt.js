const jwt = require('jsonwebtoken')

const  jwtAuthMiddleWare = (req,res,next)=>{
    const auth = req.headers.authorizations;
    if(!auth) res.status(401).json({

        message:'Unauth'
    });
    try{
        const decoded = jwt.verify(token,process.env.secret_key);
        req.user = decoded ;
        next();
    }catch(err){
        res.status(401).json({
            message:'Invalid Token'
        })
    }
}
const generateJwtToken = (userDetail)=>{
 return jwt.sign(userDetail,process.env.secret_key)
}

module.exports={jwtAuthMiddleWare,generateJwtToken}