import express from 'express';
import db from './db.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/notes', (req, res) => {
  const notes = db.prepare('SELECT * FROM notes').all();
  res.json(notes);
});

app.get('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);

  if (!note) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.json(note);
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Missing title or content' });
  }

  const result = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)').run(title, content);
  res.status(201).json({ id: result.lastInsertRowid });
});

app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const result = db.prepare('DELETE FROM notes WHERE id = ?').run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
s
