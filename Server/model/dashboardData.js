const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  courseId: {
    type: Number, 
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
  status: { type: Boolean, default: false }
});

const Enrollment = mongoose.model('enrollments', enrollmentSchema);

module.exports = Enrollment;