const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Ayushisis';


// ROUTE 1: Create a user using post "/api/auth/".Doesnt require auth

router.post("/createuser",[body('name','Enter a Valid Name!!').isLength({min: 3}),body('email').isEmail(),body('password').isLength({min: 6})],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

// check whether the user exists already
try{


let user = await User.findOne({email:req.body.email});
if(user){
    return res.status(400).json({error:"User Already Exists"});
}

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    
    
    // Create a new User
     user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      
     const data = {
         user:{
             id:user.id
         }
     } 
      const authtoken =  jwt.sign(data,JWT_SECRET);
      res.json(authtoken);

      }catch(error){
          console.error(error.message);
          res.status(500).send("some error occurred");
      }
    
   
})


// ROUTE 2: Authenticate a User using : POST "/api/auth/login"


router.post("/login",[body('email','Enter a Valid Email').isEmail(),body('password','Password cannot be blanked').exists(),],async(req,res)=>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(500).json({error:"Email or Password does not Match"});
            }
            const passwordcompare = await bcrypt.compare(password,user.password);
            if(!passwordcompare){
                return res.status(500).json({error:"Email or Password does not Match"});
            }
            const data = {
                user:{
                    id:user.id
                }
            }
            const authtoken =  jwt.sign(data,JWT_SECRET);
            res.json(authtoken);

    }catch(error){
        console.error(error.message);
        res.status(500).send("Inernal Server error occurred");
    }
  
})


// ROUTE 3: Get Logged in User Details using :POST "/api/auth/getuser". Logged in Required
router.post("/getuser",fetchuser,async(req,res)=>{

try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
}catch(error){
    console.error(error.message);
    res.status(500).send("Inernal Server error occurred");
}
})

module.exports = router;