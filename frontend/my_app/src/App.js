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

  // Handle adding an item to the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const handleCheckout = (result) => {
    // Reset cart after successful checkout
    setCartItems([]);
    setMessage("Thank you for your order!");
  };

  return (
    <div>
      <div>
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        ) : (
          <>
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
            <h2>Welcome, {user.name}!</h2>
          </>
        )}
      </div>
      <div>
        {message && <Message message={message} />}
      </div>
      {cartItems.length > 0 ? (
        <Checkout items={cartItems} onCheckout={handleCheckout} />
      ) : (
        <ProductDisplay addToCart={addToCart} />
      )}
    </div>
  );
};

export default App;
