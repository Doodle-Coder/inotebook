const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body,validationResult} = require('express-validator');

// Create a user using post "/api/auth/".Doesnt require auth
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

     user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })
      
      res.json(user);
      }catch(error){
          console.error(error.message);
          res.status(500).send("some error occurred");
      }
    
   
})

module.exports = router;