const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
// ROUTE 1:  Get all the notes using: GET ""

router.get("/",fetchuser,(req,res)=>{
    const notes = await Notes.find({user:req.user});
    obj={
        a:"thanos",
        number:"69"
    }
    res.json(obj);
})

module.exports = router;