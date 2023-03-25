const express = require("express");
const userSchema = require("../../models/user.js");
const router = express.Router();

//buscar todo
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//buscar por id
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//buscar y crear
router.get("/users/email/:email", (req, res) => {
  const { email } = req.params;
  userSchema
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        const newUser = new userSchema({ email: email });
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((error) => res.status(500).json({ message: error }));
      } else {
        res.json(user);
      }
    })
    .catch((error) => res.status(500).json({ message: error }));
});
module.exports = router;
