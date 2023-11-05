const Enrollment = require('../model/dashboardData');
const Course = require('../model/courselist'); 
const EnrolledCourses = async (req, res) => {
  try {
  
    const { courseId, studentId } = req.body;
    const isExist = await Enrollment.findOne({ courseId: courseId });
    if (isExist) {
      res.send({ msg: 'Student already Enroll the Course' });
    } else {
      const adduser = new Enrollment({
        courseId: courseId,
        studentId: studentId,

      });
      const result = await adduser.save();
      if (result) {
        res.send({ msg: "Student Enroll the Course successfully!" });
      } else {
        res.send({ error: 'Student not Enroll' });
      }
    }

  } catch (error) {
    res.send({ error: 'something went wrong' });
  }
};

const getEnrolledCourses = async (req, res) => {
  const userId = req.params.userId; 
  try {
    const enrollments = await Enrollment.find({ studentId: userId });
    const enrolledCourseIds = enrollments.map((enrollment) => enrollment.courseId);

    const enrolledCourses = await Course.find({ id: { $in: enrolledCourseIds } });
    res.status(200).json(enrolledCourses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching enrolled courses' });
  }
};

const getStatus = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const enrollment = await Enrollment.findOne({ studentId, courseId });

    if (!enrollment) {
      return res.status(404).json({ error: 'Student is not enrolled in this course' });
    }
    enrollment.status = true;
    await enrollment.save();

    res.status(200).json({ message: 'Course marked as completed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error marking the course as completed' });
  }
};







module.exports = { EnrolledCourses, getEnrolledCourses, getStatus }