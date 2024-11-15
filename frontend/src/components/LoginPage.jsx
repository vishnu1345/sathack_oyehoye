import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';
// import Navbar from './Navbar';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
      setMessage(response.data.message);
      if (response.data.message === 'Login successful') {
        navigate('/dashboard');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  return (
    <>
    {/* <Navbar></Navbar> */}
    <div className="main">
      <div className="register-page">
        <div className="form-container">
          <h1>LOGIN</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="register-btn">
              Login
            </button>
          </form>
          {message && <p className="message">{message}</p>}
          <p>
            Don't have an account?{' '}
            <a href="/" className="register-link">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
