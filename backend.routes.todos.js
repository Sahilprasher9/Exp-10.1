```js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos - list all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/todos - create todo
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/todos/:id - update todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/todos/:id - delete todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Todo.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
```
