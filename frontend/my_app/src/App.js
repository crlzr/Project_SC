import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "./App.css";
import ProductDisplay from "./components/ProductDisplay";
import Checkout from "./components/Checkout";

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const App = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

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

  // const syncConversation = useCallback((session) => {
  //   // You can create a placeholder conversation or handle it in each component
  //   const conversation = session.getOrCreateConversation('new_conversation');
  //   return conversation;
  // }, []);

  if (isLoading) return <div>Loading...</div>; // Handle loading state

  return (
    <Session appId="tD4xpjcO" syncUser={syncUser}>
      <Router>
        <Routes>
          <Route path="/items/nearby" element={<NearbyItems />} />
          <Route path="/" element={<Categories />} />
          <Route path="/profile" element={<><Home /><Profile /></>} />
          <Route path="/category/:category_name" element={<CategoryItems />} />
          <Route path="/category/:category_name/:itemId" element={<ItemsListing/>} />
          {/* syncConversation={syncConversation} */}
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <Navbar onAccountClick={handleAccountClick} />
      </Router>
    </Session>
  );
};

export default App;
