const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String }, // ← NOT required
  age: { type: Number, required: true },
  course: { type: String, required: true },
  tele: { type: String, required: true },
  gpa: { type: Number, required: true },
  isPG: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // optional
});

// Auto-generate email BEFORE validation
studentSchema.pre('save', function(next) {
  if (!this.email && this.name) {
    this.email = `${this.name.replace(/\s+/g, '').toLowerCase()}@api.com`;
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);
