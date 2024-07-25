import React, { useContext, useState } from 'react';
import './Navbar.css';
import { UserContext } from './UserContext';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const firstLetter = user ? user.name.charAt(0).toUpperCase() : '';
  const fullName = user ? user.name : '';

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className='navbar'>
      <div className='flex-box'>
        <div className="navbar-icon" onClick={toggleDropdown}>{firstLetter}</div>
        <div className="navbar-title">{fullName}</div>
      </div>
      {/* {showDropdown && (
        <div className="dropdown">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
