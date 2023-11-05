import React, { useEffect, useState } from 'react';
import './Course.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../Dashboard/Navbar';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Img1 from "../images/heart.png";
import Img2 from "../images/redheart.png";

const Courselist = (user) => {
  const [Coursedata, setCoursedata] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [enrollmentStatusFilter, setEnrollmentStatusFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [likeCounts, setLikeCounts] = useState([]);

  const perPage = 5;

  const history = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      history('/');
    }
  }, []);
  const handleEnrollmentStatusChange = (event) => {
    setEnrollmentStatusFilter(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDurationFilter(event.target.value);
  };
  const handleLike = (courseId, currentLikeCount) => {
    setLikeCounts((prevLikeCounts) => ({
      ...prevLikeCounts,
      [courseId]: likeCounts[courseId] ? 0 : 1,
    }));
  };

  const getCourse = (page) => {
    axios
      .get(
        `http://localhost:4000/api/courses?page=${page}&perPage=${perPage}&search=${searchQuery}&enrollmentStatus=${enrollmentStatusFilter}&duration=${durationFilter}`
      )
      .then((res) => {
        const { courses, currentPage, totalPages } = res.data;
        setCoursedata(courses);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
      })
      .catch((err) => console.log("error", err));
  };

  const handleSearch = () => {
    getCourse(1);
  };
  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    getCourse(currentPage);
  }, []);

  return (
    <div>
      <Navbar />
      <div className='content'>
        <h1>Courses</h1>
        <div className='header'>
          <input
            type="text"
            placeholder="Search by course name, instructor, or keywords"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleEnterKey}

          />
          <select value={enrollmentStatusFilter} onChange={handleEnrollmentStatusChange}>
            <option value="">All Enrollment Status</option>
            <option value="Open">Open</option>
            <option value="Close">Closed</option>
            <option value="In Progress">In Progress</option>
          </select>
          {/* Course Duration Filter Dropdown */}
          <select value={durationFilter} onChange={handleDurationChange}>
            <option value="">All Durations</option>
            <option value="4 weeks">4 weeks</option>
            <option value="5 weeks">5 weeks</option>
            <option value="6 weeks">6 weeks</option>
            <option value="8 weeks">8 weeks</option>
            <option value="4 months">4 months</option>
          </select>
          <button onClick={handleSearch} className='searchbtn'><SearchOutlinedIcon />Search</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }} className='card'>
          {Coursedata && Coursedata.map((e) => (
            <Card sx={{ maxWidth: 345, direction: 'row' }}  key={e.id}>
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
              <CardActions style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to={`/Details/${e.id}`}>Learn More</Link>
                <div>
                  <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={() => handleLike(e.id)}>
                    <img src={likeCounts[e.id] ? Img2 : Img1} alt='like' height={20} width={20} />
                  </button>
                  <span>{likeCounts[e.id] || 0}</span>
                </div>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button onClick={() => getCourse(currentPage - 1)}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => getCourse(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Courselist;
