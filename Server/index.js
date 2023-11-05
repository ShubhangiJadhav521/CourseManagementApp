const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const db = require('./connection/dbConnection');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true
}))
const user = require('./controller/user');
const courseController = require('./controller/courseList');
const Enrollment = require('./controller/dashboardData');

app.post('/registration', user.Register);
app.post('/login', user.Login);
app.get('/api/courses', courseController.getCourseList);
app.get('/api/courseDetail/:courseId', courseController.getCourseDetail);
app.post('/api/enroll', Enrollment.EnrolledCourses);
app.get('/api/enrolledCourses/:userId', Enrollment.getEnrolledCourses);
app.post('/api/mark-completed', Enrollment.getStatus);


app.listen(PORT, () => {
    console.log(`server listening on port-${PORT}`)
})