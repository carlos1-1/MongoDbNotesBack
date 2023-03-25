const express = require('express')
const userSchema = require('../../models/user.js')
const router = express.Router()

router.post("/users",(req, res)=>{
    const user = userSchema(req.body)
    user.save().then((data)=>res.json(data)).catch((error)=>res.json({message: error}))
  })

  router.post('/users/:id/notes', function(req, res) {
    userSchema.findById(req.params.id).exec()
      .then(user => {
        user.notes.push({
          title: req.body.title,
          description: req.body.description,
          important: req.body.important,
          finished: req.body.finished
        });
        return user.save();
      })
      .then(updatedUser => {
        res.status(200).send(updatedUser);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  
module.exports=router