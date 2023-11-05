const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  instructor: String,
  description: String,
  enrollmentStatus: String,
  thumbnail: String,
  duration: String,
  schedule: String,
  location: String,
  prerequisites: [String],
  syllabus: [
    {
      week: Number,
      topic: String,
      content: String,
    },
  ],
  students: [
    {
      id: Number,
      name: String,
      email: String,
    },
  ],
});

const Course = mongoose.model('coursesdatas', courseSchema);

module.exports = Course;
