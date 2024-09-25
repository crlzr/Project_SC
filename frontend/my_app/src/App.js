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
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState("");
  const [cartItems, setCartItems] = useState([]); // State to manage cart items

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

  useEffect(() => {
    if (isAuthenticated) {
      fetchProtectedData();
    }
  }, [isAuthenticated]);

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
