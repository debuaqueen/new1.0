// routes/api.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET /api/students?name=Alice&minGPA=3.5&course=CS
router.get('/students', async (req, res) => {
  const query = {};
  if (req.query.name) query.name = new RegExp(req.query.name, 'i');
  if (req.query.minGPA) query.gpa = { $gte: Number(req.query.minGPA) };
  if (req.query.course) query.course = new RegExp(req.query.course, 'i');
  if (req.query.age) query.age = Number(req.query.age);
  if (req.query.tele) query.tele = new RegExp(req.query.tele);
  if (req.query.isPG) query.isPG = req.query.isPG === 'true';

  try {
    const students = await Student.find(query).sort({ studentId: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/students – Minimal data allowed
router.post('/students', async (req, res) => {
  try {
    // Fill defaults
    const data = {
      studentId: req.body.studentId || Date.now(),
      name: req.body.name || 'Anonymous',
      email: req.body.email,
      age: req.body.age || 20,
      course: req.body.course || 'Unknown',
      tele: req.body.tele || '00000000',
      gpa: req.body.gpa || 0,
      isPG: req.body.isPG === true,
      owner: null // API has no user
    };

    const student = await Student.create(data);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/students/:id
router.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/students/:id
router.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
