// Profile.js

import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch('http://localhost:5004/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const profileData = await response.json();
            setProfile(profileData); // Set the profile data
          } else {
            console.error('Failed to fetch profile:', response.status);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfile(); // Fetch user profile when component mounts
  }, [isAuthenticated, getAccessTokenSilently]);

  if (loading) {
    return <div>Loading profile...</div>; // Loading state
  }

  if (!isAuthenticated) {
    return (
      <div className="login-prompt">
        <h2>Please log in to see your profile.</h2>
      </div>
    ); // Prompt to log in
  }

  return (
    <div className="profile">
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          {/* Add other profile information here */}
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default Profile;
