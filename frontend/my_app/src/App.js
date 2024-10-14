import React, { useState, useEffect } from 'react';
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

const App = () => {
  const { loginWithRedirect, user } = useAuth0(); // Get user data from Auth0

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);

  const fetchProtectedData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('http://localhost:5003/items/nearby', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data); // Use this data in your frontend
      // You might want to set fetched items to a state here if needed
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  const syncUser = useCallback(() => {
    if (!user) {
      return new Talk.User({
        id: 'guest', // Fallback ID if user is not authenticated
        name: 'Guest',
        email: 'guest@example.com',
        photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      });
    }

    // Replace with actual user data from Auth0
    return new Talk.User({
      id: user.sub, // Use the Auth0 user ID
      name: user.name || 'User', // Use the Auth0 user's name
      email: user.email, // Use the Auth0 user's email
      photoUrl: user.picture || 'https://talkjs.com/new-web/avatar-7.jpg', // Use Auth0 user's picture
      welcomeMessage: 'Hi!',
    });
  }, [user]); // Add user as a dependency

  // const syncConversation = useCallback((session) => {
  //   // You can create a placeholder conversation or handle it in each component
  //   const conversation = session.getOrCreateConversation('new_conversation');
  //   return conversation;
  // }, []);

  if (isLoading) return <div>Loading...</div>; // Handle loading state

  return (
    <Router>
      <Routes>
        <Route path="/items/nearby" element={<NearbyItems />} />
        <Route path="/" element={<Categories />} />
        <Route path="/profile" element={<><Home /><Profile /></>} />
        <Route path="/category/:category_name" element={<CategoryItems />} /> {/* New route for category items */}
        <Route path="/category/:category_name/:itemId" element={<ItemsListing />} /> {/* New route for item details */}
        <Route path="/success" element={<SuccessPage />} /> {/* New route for SuccessPage */}
      </Routes>
    <Navbar onAccountClick={handleAccountClick} />  {/* Pass the function to Navbar */}
  </Router>
  );
};

export default App;
