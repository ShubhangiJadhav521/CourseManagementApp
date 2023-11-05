import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Course.css";
import Navbar from '../Dashboard/Navbar';
import { useSelector } from 'react-redux';


function Enrollcourse() {
  const [Coursedata, setCoursedata] = useState()
  const { courseId } = useParams();
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.user.user);
  const storedData = JSON.parse(localStorage.getItem("userdata"));



  useEffect(() => {

    axios
      .get(`http://localhost:4000/api/courseDetail/${courseId}`)
      .then((response) => {
        console.log(response.data);
        setCoursedata(response.data)
      })
      .catch((error) => {
        console.error('Error fetching course details: ', error);
      });

  }, []);

  return (
    <div>
      <Navbar />
      <div className='detail'>
        <h2>Course Detail</h2>
        <div>
          {Coursedata && (
            <div className='Content_detail'>

              <img src={Coursedata.thumbnail} alt='thumbnail' height={300} width={700} />
              <h3>{Coursedata.name}</h3>
              <p>Instructor's name : {Coursedata.instructor} </p>
              <p>Enrollment status : {Coursedata.enrollmentStatus}</p>
              <p>Course duration : {Coursedata.duration}</p>
              <p> Location : {Coursedata.location}</p>
              <p>Pre-requisites : {Coursedata.prerequisites}</p>
              <p>Syllabus : </p>
              {Coursedata && Coursedata.syllabus.map((e) => (
                <ul key={e._id}>
                  <li>Week :{e.week}</li>
                  <li>{e.topic}</li>
                </ul>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Enrollcourse
