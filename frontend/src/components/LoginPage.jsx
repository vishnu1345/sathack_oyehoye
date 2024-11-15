import React, { useState } from 'react';
import './RegisterPage.css'; 

function LoginPage() {
  const [userType, setUserType] = useState('Company'); 
  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Registering as: ${userType}`);
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <h1>LOGIN</h1>
        <form onSubmit={handleRegister}>
          

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <a href="/" className="register-link">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
