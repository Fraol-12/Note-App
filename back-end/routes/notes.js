const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    
    }

    const note = new Note({
    title: req.body.title,
    content: req.body.content,
    user: req.user._id
});
await note.save();
res.status(201).json()(note);
 } catch (err) {
    console.error('Error creating note:', err.message);
    res.status(500).json({ error: 'Server error while creating note' });
 }

});

router.get('/', authMiddleware, async (req, res) => {
 try {
  const { search, filter } = req.query;

  const query = { user: req.user._id };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  let noteQuery = Note.find(query).select('title author createdAt');
  
  if (filter === 'date') {
    noteQuery = noteQuery.sort({ createdAt: -1 });
  }

  noteQuery = noteQuery.limit(20);

  const notes = await noteQuery;
if (notes.length === 0) {
  return res.status(200).json({ message: 'No matching notes found', data: [] });

}

res.status(200).json(notes);


 } catch (err) {
console.error('Error fetching notes:', err.message);
res.status(400).json({ error: 'Invalid query or server error' });
 }
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