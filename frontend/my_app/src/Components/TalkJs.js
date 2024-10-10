import React, { useEffect } from 'react';

const TalkJS = ({ renterId, authToken }) => {
  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5005/chat/${renterId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Include your JWT token here
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chat details');
        }

        const data = await response.json();
        const { currentUser, renterUser, talkAppId } = data;

        // Initialize TalkJS with the app ID and users
        const talk = new TalkJS.Session({
          appId: talkAppId,
          me: currentUser, // Use the current user info
        });

        // Example of creating a conversation
        const conversation = talk.getOrCreateConversation(
          TalkJS.oneToOneId(currentUser.id, renterUser.id)
        );

        // Load the TalkJS UI
        conversation.setAttributes({
          photoUrl: renterUser.picture, // Optional: Renter's profile picture
          title: `${currentUser.name} and ${renterUser.name}`, // Conversation title
        });

        // Open the TalkJS chat UI
        talk.mount();
      } catch (error) {
        console.error('Error fetching chat details:', error);
      }
    };

    fetchChatDetails();
  }, [renterId, authToken]); // Dependencies

  return <div id="talkjs-container" style={{ height: '500px' }}></div>; // Container for TalkJS UI
};

export default TalkJS;
