const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
    const note = new Note({
    title: req.body.title,
    content: req.body.content,
    user: req.user._id
});
await note.save();
res.json(note);
});
router.get('/', authMiddleware, async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
});


router.put('/:id', authMiddleware, async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });

  if (!note.user.equals(req.user._id)) {
    return res.status(403).json({ message: "Not authorized" });
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
  await note.save();
  res.json(note);
});

// DELETE /api/notes/:id - delete note
router.delete('/:id', authMiddleware, async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });

  if (!note.user.equals(req.user._id)) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await Note.deleteOne({ _id: note._id });
  res.json({ message: 'Note deleted successfully' });
});


module.exports = router;