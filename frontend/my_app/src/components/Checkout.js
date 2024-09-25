// components/Checkout.js
import React, { useState } from 'react';

const Checkout = ({ items, onCheckout }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    // Call your checkout API endpoint
    // For example:
    try {
      const response = await fetch('http://localhost:5003/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }), // Send items to the checkout endpoint
      });

      if (response.ok) {
        const result = await response.json();
        // Handle successful checkout
        onCheckout(result); // Callback to notify App component
      } else {
        // Handle errors (e.g., show a message)
        console.error('Checkout failed');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {loading ? (
        <p>Processing your order...</p>
      ) : (
        <>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item.name} - ${item.price}</li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Complete Checkout</button>
        </>
      )}
    </div>
  );
};

export default Checkout;
