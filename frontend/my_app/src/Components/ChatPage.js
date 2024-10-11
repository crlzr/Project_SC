// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios'; // Import axios
// import TalkJSComponent from './TalkJs';

// const ChatPage = ({ item }) => {
//   const { renterId } = useParams();
//   const [renter, setRenter] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const user = {
//     name: 'John Doe',
//     email: 'johndoe@example.com',
//     id: '123', // Make sure to replace with the actual logged-in user's ID
//   };

//   useEffect(() => {
//     if (renterId) {
//       console.log('Fetching renter data for ID:', renterId);
//         axios.get(`http://localhost:5004/chat/${item.Renter_Id}`) // Replace with an actual ID from your database
//             .then((response) => setRenter(response.data))
//             .catch((error) => console.error('Error fetching renter data:', error));
//     } else {
//       console.error('Renter ID is undefined');
//       setLoading(false);
//     }
//   }, [renterId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!renter) {
//     return <div>No renter found.</div>;
//   }
  

//   return (
//     <div>
//       {renter ? (
//         <>
//           <h1>Chat with {renter.name}</h1>
//           <TalkJSComponent user={{ ...user, renter }} />
//         </>
//       ) : (
//         <div>Loading renter information...</div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = ({ item }) => {
  const [renterData, setRenterData] = useState(null);

  const fetchRenterData = async () => {
    try {
      const url = `/chat/${item.Renter_id}`;
      console.log('Request URL:', url); // Log the URL
      const response = await axios.get(url);
      console.log(response.data);
      setRenterData(response.data);
    } catch (error) {
      console.error('Error fetching renter data:', error);
    }
  };

  // Call the function when the component loads
  useEffect(() => {
    if (item && item.Renter_id) {
      fetchRenterData();
    }
  }, [item]);

  return (
    <div>
      <h1>Chat Page</h1>
      {renterData ? (
        <p>Renter Data: {JSON.stringify(renterData)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChatPage;
