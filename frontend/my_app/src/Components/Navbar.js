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

  // Navigate to nearby items
  const handleFetchNearbyItems = () => {
    navigate('/items/nearby');
  };

  // Navigate to profile page
  const handleProfilePage = () => {
    navigate('/profile');
  };

  // Adding Items
  const onAddItemClick = () => {
    navigate('/items');
  };

  const handleInbox = () => {
    navigate('/chat');
  };

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <ul className="nav-links">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <HomeIcon className={`nav-icon ${location.pathname === '/' ? 'active' : ''}`} alt="home" />
            <a href="/">Home</a>
          </li>
          <li className={location.pathname === '/items/nearby' ? 'active' : ''}>
            <TravelExploreIcon className={`nav-icon ${location.pathname === '/items/nearby' ? 'active' : ''}`} alt="nearby" />
            <button onClick={handleFetchNearbyItems} className="explore-button">
              Nearby
            </button>
          </li>
          <li className={location.pathname === '/items' ? 'active' : ''}>
            <AddCircleIcon className={`nav-icon ${location.pathname === '/items' ? 'active' : ''}`} alt="Add Item" />
            <button onClick={onAddItemClick} className="add-item-button">
              Item
            </button>
          </li>
          <li className={location.pathname === '/chat' ? 'active' : ''}>
            <ChatIcon className={`nav-icon ${location.pathname === '/chat' ? 'active' : ''}`} alt="chat" />
            <button onClick={handleInbox} className="chat-button">
              Chat
            </button>
          </li>
          <li className={location.pathname === '/profile' ? 'active' : ''}>
            <AccountIcon className={`nav-icon ${location.pathname === '/profile' ? 'active' : ''}`} alt="account" />
            <button onClick={handleProfilePage} className="account-button">
              Account
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
