// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');
const { logStudentAction } = require('../utils/logger');

// List + Search
router.get('/', async (req, res) => {
  const query = { owner: req.session.userId };
  if (req.query.name) query.name = new RegExp(req.query.name, 'i');
  if (req.query.minGPA) query.gpa = { $gte: Number(req.query.minGPA) };

  if (req.query.isPG === 'true') query.isPG = true;
  else if (req.query.isPG === 'false') query.isPG = false;

  const students = await Student.find(query).sort({ studentId: 1 });
  res.render('students/index', { students, search: req.query });
});

// New
router.get('/new', (req, res) => res.render('students/new'));

// Add Student + Log
router.post('/', async (req, res) => {
  const { studentId, name, age, course, tele, gpa, isPG } = req.body;
  const email = `${name.replace(/\s+/g, '').toLowerCase()}@college.com`;

  const student = await Student.create({
    studentId: Number(studentId),
    name,
    email,
    age: Number(age),
    course,
    tele,
    gpa: Number(gpa),
    isPG: isPG === 'yes',
    owner: req.session.userId,
  });

  const user = await User.findById(req.session.userId);
  await logStudentAction({ userEmail: user.email, action: 'ADD', student });

  res.redirect('/students');
});

// Edit
router.get('/:id/edit', async (req, res) => {
  const student = await Student.findOne({ _id: req.params.id, owner: req.session.userId });
  if (!student) return res.redirect('/students');
  res.render('students/edit', { student });
});

// Update + Log
router.put('/:id', async (req, res) => {
  const updates = {
    age: Number(req.body.age),
    course: req.body.course,
    tele: req.body.tele,
    gpa: Number(req.body.gpa),
    isPG: req.body.isPG === 'yes'
  };

  const student = await Student.findOneAndUpdate(
    { _id: req.params.id, owner: req.session.userId },
    updates,
    { new: true }
  );

  const user = await User.findById(req.session.userId);
  await logStudentAction({ userEmail: user.email, action: 'UPDATE', student });

  res.redirect('/students');
});

// Delete + Log
router.delete('/:id', async (req, res) => {
  const student = await Student.findOneAndDelete({
    _id: req.params.id,
    owner: req.session.userId,
  });

  if (student) {
    const user = await User.findById(req.session.userId);
    await logStudentAction({ userEmail: user.email, action: 'DELETE', student });
  }

  res.redirect('/students');
});

module.exports = router;
