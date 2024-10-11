import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import TalkJSComponent from './TalkJs';

const ChatPage = () => {
  const { renterId } = useParams();
  const [renter, setRenter] = useState(null);

  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    id: '123', // Make sure to replace with the actual logged-in user's ID
  };

  useEffect(() => {
    console.log('Fetching renter data for ID:', renterId); // Log the renterId
    axios
      .get(`/api/renters/${renterId}`)
      .then((response) => setRenter(response.data))
      .catch((error) => console.error('Error fetching renter data:', error));
  }, [renterId]);
  

  return (
    <div>
      {renter ? (
        <>
          <h1>Chat with {renter.name}</h1>
          <TalkJSComponent user={{ ...user, renter }} />
        </>
      ) : (
        <div>Loading renter information...</div>
      )}
    </div>
  );
};

export default ChatPage;
