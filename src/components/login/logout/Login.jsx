import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectID': 'f104bi07c490'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          appType: 'bookingportals'
        })
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      localStorage.setItem("LoggedIn", true);
      let jsonResponse = await response.json()
      localStorage.setItem("token", jsonResponse.token)
      navigate(from, { replace: true }); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-form">
      <h2>Sign in to your account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='email-adress'>
          <h4>Email address</h4>
          <input
            className='email-id'
            type="email"
            value={email}
            placeholder='Enter your email address'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='pass-info'>
          <h4>Password</h4>
          <div className='password-wrapper'>
            <input
              className='pass-input'
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className='pass-icon'
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button 
          className='login-button' 
          type="submit"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
