const express = require('express')
const userSchema = require('../../models/user.js')
const router = express.Router()

router.put("/users/:id",(req, res)=>{
    const {id} = req.params
    const {name, email} = req.body
    userSchema.updateOne({_id:id},{$set:{name, email}}).then((data)=>res.json(data)).catch((error)=>res.json({message: error}))
})

router.put('/users/:userId/notes/:noteId', (req, res) => {
    userSchema.findById(req.params.userId)
      .then(user => {
        const note = user.notes.id(req.params.noteId);
        note.title = req.body.title;
        note.description = req.body.description;
        note.important = req.body.important;
        note.finished = req.body.finished;
        return user.save();
      })
      .then(updatedUser => res.status(200).json(updatedUser))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  

module.exports=router