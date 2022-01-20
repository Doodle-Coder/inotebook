import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{
   const notesInitial = [
    {
      "_id": "61e91c3ddac9c9e672a273ba",
      "user": "61e6b51df35985bfc0cada6a",
      "title": "My New Title",
      "description": "I want to wake up early in the morning",
      "tag": "Wake-Up New Alarm",
      "date": "2022-01-20T08:24:29.611Z",
      "__v": 0
    },
    {
      "_id": "61e91c79dac9c9e672a273bc",
      "user": "61e6b51df35985bfc0cada6a",
      "title": "My New News Title",
      "description": "I want to wake up early in the morning",
      "tag": "Wake-Up Second Alarm",
      "date": "2022-01-20T08:25:29.434Z",
      "__v": 0
    },
    {
      "_id": "61e91c79dac9c9e672a273bc",
      "user": "61e6b51df35985bfc0cada6a",
      "title": "My Ayush",
      "description": "I want to wake up early in the morning",
      "tag": "Wake-Up Second Alarm",
      "date": "2022-01-20T08:25:29.434Z",
      "__v": 0
    },
    {
      "_id": "61e91c79dac9c9e672a273bc",
      "user": "61e6b51df35985bfc0cada6a",
      "title": "My Rautela",
      "description": "I want to wake up early in the morning",
      "tag": "Wake-Up Second Alarm",
      "date": "2022-01-20T08:25:29.434Z",
      "__v": 0
    },
    {
      "_id": "61e91c79dac9c9e672a273bc",
      "user": "61e6b51df35985bfc0cada6a",
      "title": "My Second Title",
      "description": "I dont want to wake up early in the morning please Let me Sleep till 12pm.",
      "tag": "Wake-Up Second Alarm",
      "date": "2022-01-20T08:25:29.434Z",
      "__v": 0
    },
    {
      "_id": "61e91c79dac9c9e672a273bc",
      "user": "61e6b51df35985bfc0cada6a",
      "title": "My Second Title",
      "description": "I dont want to wake up early in the morning please Let me Sleep till 12pm.",
      "tag": "Wake-Up Second Alarm",
      "date": "2022-01-20T08:25:29.434Z",
      "__v": 0
    },
    {
      "_id": "61e91c79dac9c9e672a273bc",
      "user": "61e6b51df35985bfc0cada6a",
      "title": "My Second Title",
      "description": "I dont want to wake up early in the morning please Let me Sleep till 12pm.",
      "tag": "Wake-Up Second Alarm",
      "date": "2022-01-20T08:25:29.434Z",
      "__v": 0
    }
  ]


  const [notes,setNotes] = useState(notesInitial)
  
  // Add a Note
    const addNote = (title,description,tag)=>{
      const note = {
        "_id": "61e91c79dac9c9e672a273bc",
        "user": "61e6b51df35985bfc0cada6a",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2022-01-20T08:25:29.434Z",
        "__v": 0
      }
      setNotes(notes.concat(note))
    }
  
  // Delete a Note
  const deleteNote = ()=>{}

  //Edit a Note
  const editNote = ()=>{}
  
  return(
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;