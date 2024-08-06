import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailSubmitted) {
      if (email === '') {
        setError('Please enter your email address.');
      } else {
        setEmailSubmitted(true);
      }
    } else {
      if (password === '' || confirmPassword === '') {
        setError('Please enter and confirm your password.');
      } else if (password !== confirmPassword) {
        setError('Passwords do not match.');
      } else {
        try {
          const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'projectID': 'f104bi07c490'
            },
            body: JSON.stringify({
              name: userName,
              email: email,
              password: password,
              appType: 'bookingportals'
            })
          });

          if (!response.ok) {
            throw new Error('Signup failed. Please check your details.');
          }

          navigate('/login');
        } catch (error) {
          setError(error.message);
        }
      }
    }
  };

  return (
    <div className="register-form">
      <div>
      <h2>Sign in or create an account</h2>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='user-info'>
          <h4>User name</h4>
          <input
            className='user-input'
            type="text"
            value={userName}
            placeholder='Enter your user name'
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className='email-info'>
          <h4>Email address</h4>
          <input
            className='email-input'
            type="email"
            value={email}
            placeholder='Enter your email address'
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={emailSubmitted}
          />
        </div>

        {emailSubmitted && (
          <>
            <div className='password-info'>
              <h4>Enter Password</h4>
              <div className='password-wrapper'>
                <input
                  className='password-input'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder='Enter your password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className='password-icon'
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <div className='confirm-pass'>
              <h4>Confirm Password</h4>
              <div className='password-wrapper'>
                <input
                  className='password-input'
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  placeholder='Confirm your password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  className='password-icon'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>
            </div>
          </>
        )}

        <button className='email-button' type="submit">
          {emailSubmitted ? 'Sign up' : 'Continue with email'}
        </button>
      </form>
    </div>
  );
};

export default Register;
