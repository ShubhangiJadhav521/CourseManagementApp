import Login from './Compoents/Auth/Login';
import './App.css';
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Dashboard from './Compoents/Dashboard/Dashboard';
import Courselist from './Compoents/CourseList/Courselist';
import CourseDetail from './Compoents/CourseList/CourseDetail';
import Navbar from './Compoents/Dashboard/Navbar';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Enrollcourse from './Compoents/CourseList/Enrollcourse';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
      
      <Route>
        <Route path="/" element={<Login  />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path="/Courselist" element={<Courselist  />} />
          <Route path="/Details/:courseId" element={<CourseDetail />} />
          <Route path="/EnrollDetails/:courseId" element={<Enrollcourse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
