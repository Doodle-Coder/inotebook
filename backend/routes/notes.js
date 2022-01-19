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

// ROUTE 3:  Update an existing Note using: POST "api/notes/updatenote"  Login Required

router.put("/updatenote/:id",fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;
    try{
     
     // if there are errors,returns bad request and the errors 
     const newNote = {};
     if(title){newNote.title = title};
     if(description){newNote.description = description};
     if(tag){newNote.tag = tag};

     // Find the note to be updated
     let note = await Notes.findById(req.params.id);
     if(!note){
         return res.status(404).send("Not Found");
     }
     if(note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
     }
     note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
     res.json({note});
    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occurred");
    }
})

// ROUTE 4: Delete an existing note using: DELETE "api/notes/deletenote".  Login REequired


router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
    try{
 
    
     // Find the note to be Deleted and Delete it

     let note = await Notes.findById(req.params.id);
     if(!note){
         return res.status(404).send("Not Found");
     }

    //  Allowed deletion only if user owns this Note

     if(note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
     }
     note = await Notes.findByIdAndDelete(req.params.id)
     res.json({"Success":"Note has been deleted"});
    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occurred");
    }
})


module.exports = router;