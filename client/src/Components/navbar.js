import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import logo from '../Components/logo.png';
import '../CSS/navbar.css';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef(null); // Create a ref for the username button

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.userName); // Adjust this based on your token's structure
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token', error);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
    setUsername('');
    setDropdownOpen(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <div className="navbar">
      <div>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav>
        <ul className="nav-links">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <li className="nav-item">
            <a className="nav-link" href="/ourservices">Our Services</a>
          </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <li className="nav-item">
            <a className="nav-link" href="/our-services/doctors">Doctors</a>
          </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <li className="nav-item">
            <a className="nav-link" href="/our-services/equipments">Ortho Resources</a>
          </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <li className="nav-item">
            <a className="nav-link" href="/contactus">Contact Us</a>
          </li>
          {isAuthenticated ? (
            <li className="nav-item">
              <div className="dropdown">
                <div className="username-container">
                  <button ref={usernameRef} className="login-button" onClick={toggleDropdown} style={{backgroundColor:'transparent',color:'black'}}>
                   <b><img src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' style={{height:'70px',borderRadius:'50px'}} ></img></b>
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleProfileClick}> {username}</button>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <a className="nav-link" href="/login">
                <button className="login-button">Login</button>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;






