import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Auth = () => {
  const [className, setClassName] = useState('right-panel-deactive');
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });
  const [registerDetails, setRegisterDetails] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // to add and remove the classList on clicking signup/signin button
  const handleClick = (props) => {
    if (props === 'signup') {
      setClassName('right-panel-active');
    } else {
      setClassName('right-panel-deactive');
    }
  };

  const invalidInfo = () => {
    if (registerDetails.password !== registerDetails.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return true;
    }
    return false;
  };

  const RegisterHandleClick = (e) => {
    e.preventDefault();
    if (invalidInfo()) return;
    axios.post('http://127.0.0.1:5000/signup', registerDetails).then((resp) => {
      console.log(resp);
      if (resp.data === 'ok') {
        setSuccessMessage('Registered Successfully, Signin Now!');
        document.getElementById('registerForm').reset();
        setClassName('right-panel-deactive');
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 4000);
      } else {
        setErrorMessage('Something went wrong!');
      }
    });
  };

  const LoginHandleClick = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/login', loginDetails).then((resp) => {
      if (resp.status === 200) {
        console.log(resp.data);
      } else {
        setErrorMessage(resp.data);
      }
    });
  };

  return (
    <div className="Login">
      {errorMessage !== '' ? (
        <h4 className="error-message">{errorMessage}</h4>
      ) : (
        ''
      )}
      {successMessage && <h4 className="success-message">{successMessage}</h4>}
      <h2>Sign in/up Form</h2>
      <div className={className} id="container">
        <div className="form-container sign-up-container" id="form-container">
          <form action="#" id="registerForm">
            <h1 className="register-head">Create Account</h1>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  username: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  username: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  password: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) =>
                setRegisterDetails({
                  ...registerDetails,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button onClick={RegisterHandleClick}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container" id="form-container">
          <form action="#" id="loginForm">
            <h1
              style={{
                marginTop: '-2rem',
                marginBottom: '1.5rem',
              }}
            >
              Sign in
            </h1>
            <div id="googleSignIn" style={{ marginBottom: '1.5rem' }}></div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setLoginDetails({
                  ...loginDetails,
                  username: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginDetails({
                  ...loginDetails,
                  password: e.target.value,
                })
              }
            />
            {/* <a href="#">Forgot your password?</a> */}
            <button onClick={LoginHandleClick}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container" id="overlay-container">
          <div className="overlay" id="overlay">
            <div
              className="overlay-panel overlay-left"
              id="overlay-panel overlay-left"
            >
              <h1>Welcome Back!</h1>
              <p>
                Register an Account with your Credentials
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleClick('signin')}
              >
                Sign In
              </button>
            </div>
            <div
              className="overlay-panel overlay-right"
              id="overlay-panel overlay-right"
            >
              <h1>Hello there!</h1>
              <p>
                Sign in to continue from where you've left
              </p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleClick('signup')}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
