const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){
    try {
        const token = req.header('auth-token');
        console.log(token)
        if(!token) return res.json({message:'Access Denied'})
        const verified = jwt.verify(token,process.env.KEY);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send({message:err})
    }
}
