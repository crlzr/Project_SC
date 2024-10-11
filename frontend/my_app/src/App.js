import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Components/Navbar';
import NearbyItems from './Components/NearbyItems';
import Categories from './Components/Categories';
import CategoryItems from './Components/CategoryItems';
import ItemsListing from './Components/Items';
import Home from './Components/Home';
import ChatPage from './Components/ChatPage';
import './index.css';
import SuccessPage from './Components/SuccessPage';
import Profile from './Components/Profile';

const App = () => {
  const { loginWithRedirect } = useAuth0();

  const handleAccountClick = () => {
    loginWithRedirect();
  };


  return (
    <Router>
      <Routes>
        <Route path="/items/nearby" element={<NearbyItems />} />
        <Route path="/" element={<Categories />} />
        <Route path="/profile" element={<><Home /><Profile /></>} />
        <Route path="/category/:category_name" element={<CategoryItems />} /> {/* New route for category items */}
        <Route path="/category/:category_name/:itemId" element={<ItemsListing />} /> {/* New route for item details */}
        <Route path="/chat/:renterId" element={<ChatPage />} />{/* New route for item details */}
        <Route path="/success" element={<SuccessPage />} /> {/* New route for SuccessPage */}
      </Routes>
    <Navbar onAccountClick={handleAccountClick} />  {/* Pass the function to Navbar */}
  </Router>
  );
};

export default App;