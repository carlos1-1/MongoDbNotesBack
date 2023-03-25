const express = require("express");
const userSchema = require("../../models/user.js");
const router = express.Router();

//buscar notas
router.get("/users/:id/notes", async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//buscar solo importantes
router.get("/users/:id/notes/important/:boolean", async (req, res) => {
  try {
    const boolean = req.params.boolean;
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const notesImportant = await user.notes.filter(
      (note) => note.important === (boolean === "true")
    );
    res.json(notesImportant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//buscar solo finalizadas
router.get("/users/:id/notes/finished/:boolean", async (req, res) => {
  try {
    const boolean = req.params.boolean;
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const notesImportant = await user.notes.filter(
      (note) => note.finished === (boolean === "true")
    );
    res.json(notesImportant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//buscar especifico
router.get("/users/:id/notes/:noteId", async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const note = user.notes.find(
      (note) => note._id.toString() === req.params.noteId
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
