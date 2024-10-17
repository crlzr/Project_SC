import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Components/Navbar';
import NearbyItems from './Components/NearbyItems';
import Categories from './Components/Categories';
import CategoryItems from './Components/CategoryItems';
import ItemsListing from './Components/Items';
import Home from './Components/Home';
import './index.css';
import SuccessPage from './Components/SuccessPage';
import Profile from './Components/Profile';
import { Session, Inbox } from '@talkjs/react';
import Talk from 'talkjs';
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResult';
import ItemForm from './Components/ItemForm';

const App = () => {

  const [searchResults, setSearchResults] = useState([]);

  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

  const handleAccountClick = () => {
    loginWithRedirect();
  };

  const syncUser = useCallback(() => {
    if (isAuthenticated && user) {
      return new Talk.User({
        id: user.sub,
        name: user.name,
        email: user.email,
        photoUrl: user.picture || 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      });
    } else {
      // Return a default guest user if not authenticated
      return new Talk.User({
        id: 'guest',
        name: 'Guest',
        email: 'guest@example.com',
        photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      });
    }
  }, [isAuthenticated, user]);

  if (isLoading) return <div>Loading...</div>; // Handle loading state

  return (
    <Session appId={process.env.REACT_APP_TALKJS_APP_ID} syncUser={syncUser}>
      <Router>
      <div className="logo-container">
          <img src={"sharecirclelogo.png"} alt="Logo" className="logo" />
          <h1 className="logo-text">Share Circle</h1>
        </div>
        <Routes>
          <Route path="/items/nearby" element={<NearbyItems />} />
           {/* Chat Route */}
          <Route
            path="/chat"
            element={
              isAuthenticated ? (
                <Inbox
                  conversationId={`conversation_${user.sub}`}
                  style={{ width: '100%', height: '500px' }}
                  className="talkjs-container"
                />
              ) : (
                <div className="login-prompt" style={{ textAlign: 'center' }}>
                  <h2>You need to log in to access the chat.</h2>
                  <button className="login-button" onClick={loginWithRedirect}>Log In</button>
                </div>
              )
            }
          />
          <Route
          path="/"
          element={
            <div className="searchbar-categories">
              <SearchBar onSearch={setSearchResults} />
              < Categories />
            </div>
          }
        />
        {/* Route for search results */}
        <Route
          path="/search"
          element={<SearchResults results={searchResults} />}
        />
          <Route path="/profile" element={<><Profile /><Home /></>} />
          <Route path="/items" element={<ItemForm />} />
          <Route path="/category/:category_name" element={<CategoryItems />} />
          <Route path="/category/:category_name/:itemId" element={<ItemsListing/>} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <Navbar onAccountClick={handleAccountClick} />
      </Router>
    </Session>
  );
};

export default App;
