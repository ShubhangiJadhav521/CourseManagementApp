import React, { useState } from 'react';
import "./Auth.css";
import { Grid, Link } from '@mui/material';
import SignUp from './SignUp';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { login, logout } from "../../Redux/Action/userAction";
import { useDispatch } from 'react-redux';


function Login(props) {
    const history = useNavigate();
    const dispatch = useDispatch()
    const [Noaccount, setNoaccount] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handdleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    const Logindata = () => {
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:4000/login`, user).then((res) => {
            if (res.data.msg) {
                alert(res.data.msg);
                dispatch(login(res.data))
                localStorage.setItem("userdata", JSON.stringify(res.data));
                history('/Dashboard');
            } else {
                alert(res.data.error);
            }
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <div >

                    <div className='model'>
                        <Grid container spacing={2}>
                            <Grid item xl={6} lg={6}  className='right_model'>
                                <h2 className='text-model'>1000+ Courses for Free</h2>
                            </Grid>
                            <Grid item xl={6} lg={6}   className='Left_model'>
                                {Noaccount ? (
                                    <SignUp setNoaccount={setNoaccount} />
                                ) : (
                                    <div>
                                        <h2>Login</h2>
                                        <div className='field'>
                                            <input type='email' placeholder='Email Address' name='email' onChange={handdleChange} required /><br />
                                            <input type='password' placeholder='Password' name='password' onChange={handdleChange} required />

                                            <div>
                                                <button type='submit' className='btn' onClick={Logindata}>Submit</button>
                                            </div>
                                            <Grid container>
                                                <Grid item xs>
                                                    <Link href="#" variant="body2">
                                                        Forgot password?
                                                    </Link>
                                                </Grid>
                                                <Grid item>
                                                    <Link href="#" variant="body2" onClick={() => setNoaccount(true)}>
                                                        {"Don't have an account? Sign Up"}
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </div>

                </div>
            </header>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = {
    login,
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
