const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: '1', title: 'Plan next challenge', completed: false },
  { id: '2', title: 'Review existing issues', completed: true },
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find((item) => item.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, completed } = req.body;
  if (typeof title === 'string') {
    task.title = title.trim() || task.title;
  }
  if (typeof completed === 'boolean') {
    task.completed = completed;
  }

  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const initialLength = tasks.length;
  tasks = tasks.filter((item) => item.id !== req.params.id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(port, () => {
  console.log(`REST API server listening on http://localhost:${port}`);
});
