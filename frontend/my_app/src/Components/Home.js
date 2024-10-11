import React, { useEffect, useCallback, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserLocation } from '../Location';
import LogoLoader from './LogoLoader';

const Home = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [userAddress, setUserAddress] = useState({});
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Fetch protected data for renters/nearby items
  const fetchProtectedData = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('http://localhost:5004/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data); // Handle data as needed
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          await fetchProtectedData(); // Fetch protected data

          const location = await getUserLocation(); // Get user location
          console.log('User location:', location); // Debugging log
          setUserAddress(location.address || { street: 'Unknown', city: 'Unknown', state: 'Unknown', postcode: '' });
        } catch (error) {
          console.error('Error getting user location:', error);
        } finally {
          setLoading(false); // Set loading to false when data fetching is complete
        }
      } else {
        setLoading(false); // Set loading to false if not authenticated
      }
    };

    fetchData(); // Call fetchData when the user authentication state changes
  }, [isAuthenticated, fetchProtectedData]);

  return (
    <div className="centered-container">
      {loading ? ( // Show loader while loading
        <LogoLoader />
      ) : (
        <>
          {!isAuthenticated ? (
            <button className="login-button" onClick={() => loginWithRedirect()}>Log In</button>
          ) : (
            <>
              <button className="login-button" onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
              <h2 className="welcome">Welcome, {user.name}!</h2>
              {userAddress && (
                <p className="user-address">
                  {userAddress.street}, {userAddress.city}, {userAddress.state} {userAddress.postcode}
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
