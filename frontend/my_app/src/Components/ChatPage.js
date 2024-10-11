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
    if (renterId) {
      console.log('Fetching renter data for ID:', renterId);
        axios.get(`http://localhost:5004/api/renters/1`) // Replace with an actual ID from your database
            .then((response) => setRenter(response.data))
            .catch((error) => console.error('Error fetching renter data:', error));
      // axios
      //   .get(`http://localhost:5004/api/renters/${renterId}`)
      //   .then((response) => setRenter(response.data))
          // .catch((error) => console.error('Error fetching renter data:', error));
    } else {
      console.error('Renter ID is undefined');
    }
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
