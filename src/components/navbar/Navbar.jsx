import { useNavigate, useLocation } from 'react-router-dom';
import "./navbar.css";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faSuitcase } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedInOut, setLoggedInOut] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("LoggedIn");
    if (isLoggedIn) {
      setLoggedInOut(true);
    } else {
      setLoggedInOut(false);
    }
  }, []); 
  

  const handleLoginClick = () => {
    navigate('/login', { state: { from: location } });
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("LoggedIn");
    setLoggedInOut(false);
    setIsDropdownOpen(false); // Close the dropdown on logout
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/signup', { state: { from: location } });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMyTrips = () => {
    navigate("/my_trips");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking.com</span>
        <div className="navItems">
          {loggedInOut ? (
            <div className="profile-container">
              <div className='profile' onClick={toggleDropdown}>
                <div className='profile-icon'>
                  <FontAwesomeIcon icon={faUser} className='p-icon' />
                </div>
                <label>Your account</label>
              </div>
              {isDropdownOpen && (
                <div className="dropdown">
                  <ul>
                    <li onClick={handleMyTrips}><FontAwesomeIcon icon={faSuitcase} /> My trips</li>
                    <li onClick={handleLogOutClick}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign out</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div>
              <button className="navButton" onClick={handleRegister}>Register</button>
              <button className="navButton" onClick={handleLoginClick}>Sign in</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
