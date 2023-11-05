const Course = require('../model/courselist'); 

const getCourseList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 5;
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  try {
    const searchParams = {};

    // Check if a search query is provided
    if (req.query.search) {
      const searchQuery = new RegExp(req.query.search, 'i'); // Case-insensitive search
      searchParams.$or = [
        { name: searchQuery },
        { instructor: searchQuery },
        { description: searchQuery },
      ];
    }

    // Optional filters based on enrollment status
    if (req.query.enrollmentStatus) {
      searchParams.enrollmentStatus = req.query.enrollmentStatus;
    }

    // Optional filter based on course duration
    if (req.query.duration) {
      searchParams.duration = req.query.duration;
    }

    const courses = await Course.find(searchParams, 'id name instructor description enrollmentStatus thumbnail duration')
      .skip(startIndex)
      .limit(perPage);

    const totalCourses = await Course.countDocuments(searchParams);

    res.status(200).json({
      courses,
      currentPage: page,
      totalPages: Math.ceil(totalCourses / perPage),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses' });
  }
};


const getCourseDetail = async (req, res) => {
 
  try {
    const courseId = parseInt(req.params.courseId); // Cast the courseId to an integer
    const course = await Course.findOne({ id: courseId });

    if (isNaN(courseId) || courseId <= 0) {
      return res.status(400).json({ error: 'Invalid course ID' });
    };
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course); // Send the course data as the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getCourseList ,getCourseDetail};