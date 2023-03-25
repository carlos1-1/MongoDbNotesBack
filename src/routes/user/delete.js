const express = require('express')
const userSchema = require('../../models/user.js')
const router = express.Router()

router.delete('/users/:id', (req, res) => {
    const {id} = req.params
    userSchema.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: 'No se encontró el usuario con el id proporcionado.' });
        } else {
          res.send({ message: 'El usuario ha sido eliminado exitosamente.' });
        }
      })
      .catch(error => res.status(500).send({ message: error }));
  });

  router.delete('/users/:userId/notes/:noteId', (req, res) => {
    const { userId, noteId } = req.params
    userSchema
      .findByIdAndUpdate(userId, { $pull: { notes: { _id: noteId } } }, { new: true })
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).send('User not found')
        }
        res.status(200).send(updatedUser)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  })

module.exports=router