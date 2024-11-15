import React, { useState } from 'react';
import './RegisterPage.css'; 

function RegisterPage() {
  const [userType, setUserType] = useState('Company'); 
  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Registering as: ${userType}`);
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <h1>REGISTER</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="userType">&nbsp;Register as:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="Company">Company</option>
              <option value="NGO">NGO</option>
            </select>
          </div>

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
            Register
          </button>
        </form>
        <p>
          Already Registered?{' '}
          <a href="/login" className="register-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
