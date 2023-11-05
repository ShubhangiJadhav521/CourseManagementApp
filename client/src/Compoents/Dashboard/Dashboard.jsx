import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));
const Dashboard = () => {
  const userdata = useSelector((state) => state.user.user);
  const storedData = JSON.parse(localStorage.getItem("userdata"));
  const user = localStorage.getItem("userdata")
  const history = useNavigate();
  const [course, setCoursedata] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  const Coursedata = () => {
    axios.get(`http://localhost:4000/api/enrolledCourses/${storedData.id}`).then((res) => {
      setCoursedata(res.data)
    }).catch((err) => console.log("error", err))
  }
  const markCourseCompleted = (id) => {
    const data = {
      "studentId": storedData.id,
      "courseId": id

    }
    axios.post('http://localhost:4000/api/mark-completed', data)
      .then((response) => {
        console.log("res", response)
        setCompletedCourses([...completedCourses, id]);
        localStorage.setItem("completedCourses", JSON.stringify([...completedCourses, id]));
      })
      .catch((error) => {
        console.error('Error marking course as completed', error);
      });
  };
  useEffect(() => {
    Coursedata();
    const completedCoursesFromStorage = JSON.parse(localStorage.getItem("completedCourses"));
    if (completedCoursesFromStorage) {
      setCompletedCourses(completedCoursesFromStorage);
    }
  }, [])


  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      history('/');
    }
  })
  return (
    <div>
      <Navbar />
      <div className='content' >
        <h1>Welcome {storedData.user}, continue learning</h1>
        <h3>My Courses</h3>
        {course.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} className='card'>
            {course && course.map((e) => (
              <Card sx={{ maxWidth: 345, direction: 'row' }} key={e.id}>

                <CardMedia
                  sx={{ height: 140 }}
                  image={e.thumbnail}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {e.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {e.description}
                  </Typography>

                </CardContent>
                <BorderLinearProgress variant="determinate" value={50} style={{ margin: '10px' }} />
                <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {completedCourses.includes(e.id) ? (
                    <p style={{ color: 'green' }}>Course Completed!</p>
                  ) : (
                    <button onClick={() => markCourseCompleted(e.id)} className='btnmark'>Mark as Completed</button>
                  )}
                  <Link to={`/EnrollDetails/${e.id}`}>Learn More</Link>
                </CardActions>
              </Card>
            ))}

          </div>
        ) : (<>
          <h3>You Not EnrollCourse</h3>
        </>)}


      </div>
    </div>
  )
}

export default Dashboard