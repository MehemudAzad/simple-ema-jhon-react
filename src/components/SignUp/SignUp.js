import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import './SignUp.css'

const SignUp = () => {
    const [error, setError] = useState(null);
    const {createUser, googleSignIn} = useContext(AuthContext);

    const navigate = useNavigate(); 
    const location = useLocation(); //it returns the current location objects
    const from  = location.state?.from?.pathname ||'/' //either go to the path if it exists or go to the homepage

    const handleGoogleLogin =()=>{
        googleSignIn()
        .then(result=>{
            const user = result.user;
            console.log(user)
        })
        .catch(err => console.log(err))
    }

    const handleSubmit = (event)=>{
        event.preventDefault(); 
        
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        //checking if the password is greater than 6 
        if(password.length < 6){
            setError('password must be 6 characters or more');
            return;
        }
        //checking if the password is mismatched
        if (password !== confirm) {
            setError('Your Password did not match');
            return;
        }

        createUser(email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            navigate(from, {replace: true}); //navigate to from and replace it with true
            form.reset();     
          })
        .catch(error => console.error(error))
    }
    return (
        <div className='form-container'>
        <h1 className='form-title'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <div className='form-control'>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required/>
            </div>
            <div className='form-control'>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
            </div>
            <div className='form-control'>
            <label htmlFor="confirm">Confirm password</label>
            <input type="password" name="confirm" id="confirm" required />
            </div>
            <input type="submit" className='btn-submit form-control' value="login" />
        </form>
            <p className='form-control'>Already have an account?<Link to='/login'>Login</Link></p>
            <p className='text-error'>{error}</p>
            <div className='or-horizontal'>
               <div></div>
                <p>or</p>
               <div></div>
            </div>
            <div onClick={handleGoogleLogin} className='google-login-container'>
                <FcGoogle className='google-icon'></FcGoogle>
                <p>Continue with Google</p>
            </div>
    </div>
    );
};

export default SignUp;