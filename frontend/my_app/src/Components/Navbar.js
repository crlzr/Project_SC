import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ChatIcon from '@mui/icons-material/Chat';
import AccountIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';



const Navbar = ({ onAccountClick }) => {
  const navigate = useNavigate();

    // Navigate to nearby items
  const handleFetchNearbyItems = () => {
    navigate('/items/nearby');
  };

  // Navigate to profile page
  const handleProfilePage = () => {
    navigate('/profile');
  };

  const handleChatBox = () => {
    navigate('/chat/${renterId}');
  };

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <HomeIcon className="nav-icon" alt="home" />
            <a href="/">Home</a>
          </li>
          <li>
            <TravelExploreIcon className="nav-icon" alt="explore" />
            <button onClick={handleFetchNearbyItems} className="explore-button">
              Explore
            </button>
          </li>
          <li>
            <ChatIcon className="nav-icon" alt="chat" />
            <button onClick={handleChatBox} className="chat-button">
              Chat
            </button>
          </li>
          <li>
            <AccountIcon className="nav-icon" alt="account" />
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
