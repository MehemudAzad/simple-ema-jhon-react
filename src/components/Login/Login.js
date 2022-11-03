import React, { useContext } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import './Login.css'

const Login = () => {
    const {signIn} = useContext(AuthContext);
    //setting the navigate function
    const navigate = useNavigate(); 
    const location = useLocation(); //it returns the current location objects
    const from  = location.state?.from?.pathname ||'/' //either go to the path if it exists or go to the homepage

    const handleSubmit = event =>{
        // to prevent it from opening in a new window which is the default behaviour
        event.preventDefault();
        //it will give the form field
        const form = event.target;
        //you will get the value of the form field email
        const email = form.email.value;
        //you will get the value of the form field password
        const password = form.password.value;

        //using the signIn mehtod
        signIn(email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            form.reset();  //reseting the form
            Navigate(from, {replace: true}); //navigate to from and replace it with true
        })
        .catch(error => console.error(error));//catching the error if there was any error
    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                <label htmlFor="email">Email</label>
                <input type="email" name="name" id="" required/>
                </div>
                <div className='form-control'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" required />
                </div>
                <input type="submit" className='btn-submit form-control' value="login"  />
            </form>
            <p className='form-control'>New to ema john<Link to='/signup'>Create A new Account</Link></p>
        </div>
    );
};

export default Login;