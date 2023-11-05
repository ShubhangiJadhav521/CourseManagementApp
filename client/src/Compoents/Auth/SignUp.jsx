import React from 'react';
import "./Auth.css";
import { Grid, Link } from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";

const SignUp = (props) => {
    const history = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        Name:""
    })
    const Registration = () => {
        const {email,password,Name}=user;
        if(email && password && Name){
         axios.post('http://localhost:4000/registration', user).then((res) => {
             if (res.data.msg) {
                 alert(res.data.msg);
                 props.setNoaccount(false)
             } else {
                 alert(res.data.error);
             }
         })
        }else{
         alert("fields are required")
        }
     }
     const handdleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
       
    }
    return (
        <div>
            <h2>Sign Up</h2>
            <div className='field'>
            <input type='text' placeholder='Name' name='Name' onChange={handdleChange}/><br />
                <input type='email' placeholder='Email Address' name='email' onChange={handdleChange}/><br />
                <input type='password' placeholder='Password'name='password' onChange={handdleChange}/>
                <div>
                    <button className='btn' onClick={Registration}>Submit</button>
                </div>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2" onClick={() => props.setNoaccount(false)}>
                            {"Already have an account? Log In"}
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default SignUp