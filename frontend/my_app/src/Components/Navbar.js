import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ChatIcon from '@mui/icons-material/Chat';
import AccountIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Navbar = ({ onAccountClick }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Navigation functions
  const handleFetchNearbyItems = (e) => {
    e.preventDefault();
    navigate('/items/nearby');
  };

  const handleProfilePage = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  const onAddItemClick = (e) => {
    e.preventDefault();
    navigate('/items');
  };

  const handleInbox = (e) => {
    e.preventDefault();
    navigate('/chat');
  };

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <ul className="nav-links">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <HomeIcon className={`nav-icon ${location.pathname === '/' ? 'active' : ''}`} alt="home" />
            <a href="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </a>
          </li>
          <li className={location.pathname === '/items/nearby' ? 'active' : ''}>
            <TravelExploreIcon className={`nav-icon ${location.pathname === '/items/nearby' ? 'active' : ''}`} alt="nearby" />
            <a href="/items/nearby" onClick={handleFetchNearbyItems} className={location.pathname === '/items/nearby' ? 'active' : ''}>
              Nearby
            </a>
          </li>
          <li className={location.pathname === '/items' ? 'active' : ''}>
            <AddCircleIcon className={`nav-icon ${location.pathname === '/items' ? 'active' : ''}`} alt="Add Item" />
            <a href="/items" onClick={onAddItemClick} className={location.pathname === '/items' ? 'active' : ''}>
              Item
            </a>
          </li>
          <li className={location.pathname === '/chat' ? 'active' : ''}>
            <ChatIcon className={`nav-icon ${location.pathname === '/chat' ? 'active' : ''}`} alt="chat" />
            <a href="/chat" onClick={handleInbox} className={location.pathname === '/chat' ? 'active' : ''}>
              Chat
            </a>
          </li>
          <li className={location.pathname === '/profile' ? 'active' : ''}>
            <AccountIcon className={`nav-icon ${location.pathname === '/profile' ? 'active' : ''}`} alt="account" />
            <a href="/profile" onClick={handleProfilePage} className={location.pathname === '/profile' ? 'active' : ''}>
              Account
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
