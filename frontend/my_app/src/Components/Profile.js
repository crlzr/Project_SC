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
            setProfile(profileData);
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

    fetchProfile();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (loading) {
    return <div>Loading profile...</div>;
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
          <img src={user.picture}  alt="User Profile" className="profile-image" />
        </div>
        {/* Moved user name outside profile-image-container */}
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
