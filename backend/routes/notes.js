const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const {body,validationResult} = require('express-validator');
const Notes = require('../models/Notes');
// ROUTE 1:  Get all the notes using: GET "api/notes/fetchallnotes"

router.get("/fetchallnotes",fetchuser,async(req,res)=>{
    try{
        const notes = await Notes.find({user:req.user.id});    
    res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occurred");
    }
    
})

// ROUTE 2:  Add a note using: POST "api/notes/addnote"  Login Required

router.post("/addnote",fetchuser,[body('title','Enter a Valid Title!!').isLength({min: 5}),body('description','Description must be at lreast 10 characters').isLength({min: 20})],async(req,res)=>{
   try{
    const {title,description,tag} = req.body;

    // if there are errors,returns bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Notes({title,description,tag,user:req.user.id})
    const savednote = await note.save()
    

    res.json(savednote);
   }catch(error){
    console.error(error.message);
    res.status(500).send("some error occurred");
   }
   
})

module.exports = router;