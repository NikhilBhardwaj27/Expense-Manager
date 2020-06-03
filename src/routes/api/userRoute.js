const User = require('../../modals/userModal')
const router = require('express').Router()
const {registerValidation,loginValidation} = require('../../validation/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


/*  @Route -- /route/api/new-user/register
    @Access -- Public
    @Method -- POST
*/
router.post('/new-user/register',async(req,res)=>{
    const {username,email,password} = JSON.parse(req.body.body)
    const error = registerValidation(req.body.body)
    if(error.error){
        return res.send({message:error.error.details[0].message})
    }

    // Check if user already exists
    let result =  await User.findOne({email:email})
    if(result){
        return res.send({message:'User with email already present'})
    }

    // Hashing Passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = new User({
        username:username,
        email:email,
        password:hashedPassword,
    })

    // Saving to database
    result = await user.save()
    res.json(result)
})

/*  @Route -- /route/api/user-login
    @Access -- Public
    @Method -- POST
*/
router.post('/user-login',async(req,res)=>{

    const {email,password} = JSON.parse(req.body.body)
    const error = loginValidation(req.body.body)
    
    try {   
        if(error.error){
            return res.send({message:error.error.details[0].message})
        }

        // Check if user already exists
        let user =  await User.findOne({email:email})
        if(!user){
            return  res.send({message:'Email does not exists'})
        }

        // Load hash from your password DB.
        bcrypt.compare(password, user.password, function(err, result) {
            if(!result){
                return res.json({message:'Invalid Password'})
            }
            else{
                const token = jwt.sign({_id:user._id},process.env.KEY)
                res.header('auth-header',token).send({"token":token})
            }
        });

    }catch(message){
        res.status(500)
    }
})


module.exports = router
