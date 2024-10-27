import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import HomepageLoader from './HomepageLoader'; // Import HomepageLoader

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [setProfile] = useState(null); // Correctly initialize profile state
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          // const response = await fetch('http://localhost:5005/profile', {
          const response = await fetch('https://project-sc.onrender.com/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const profileData = await response.json();
            setProfile(profileData); // Store profile data
          } else {
            console.error('Failed to fetch profile:', response.status);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false); // Set loading to false when fetching completes
        }
      } else {
        setLoading(false); // Set loading to false if not authenticated
      }
    };

    fetchProfile();
  }, [isAuthenticated, getAccessTokenSilently, setProfile]); // Add dependencies

  if (loading) {
    return <HomepageLoader />; // Show HomepageLoader while loading
  }

  if (!isAuthenticated) {
    return (
      <div className="login-prompt">
        <h2>Please log in to see your profile.</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={user.picture} alt="User Profile" className="profile-image" />
        </div>
        <h2 className="user-name">{user.name || 'User Name'}</h2>
      </div>
      <div className="profile-info">
        <p className="label">Email:</p>
        <p className="email">{user.email}</p>
      </div>
      <div className="profile-features">
        <div className="setting-option">
          <p className="setting-text">Bookings</p>
          <span className="right-arrow">&gt;</span>
        </div>
        <div className="setting-option">
          <p className="setting-text">Reviews</p>
          <span className="right-arrow">&gt;</span>
        </div>
        <div className="setting-option">
          <p className="setting-text">Settings</p>
          <span className="right-arrow">&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;