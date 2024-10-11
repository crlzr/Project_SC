import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TalkJSComponent from './TalkJs';

const ChatPage = () => {
  const { renterId } = useParams();
  const [renter, setRenter] = useState(null);

  // Hardcoded user data for now
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    id: '123', // unique user ID
  };

  useEffect(() => {
    // Fetch renter data from your backend API using the renterId
    fetch(`/api/renters/${renterId}`)
      .then((res) => res.json())
      .then((data) => {
        setRenter(data);
      })
      .catch((error) => console.error('Error fetching renter data:', error));
  }, [renterId]);

  return (
    <div>
      {renter ? (
        <>
          <h1>Chat with {renter.name}</h1>
          {/* Pass user and renter data to TalkJS */}
          <TalkJSComponent user={{ ...user, renter }} /> {/* Combine user and renter data */}
        </>
      ) : (
        <div>Loading renter information...</div>
      )}
    </div>
  );
};

export default ChatPage;
