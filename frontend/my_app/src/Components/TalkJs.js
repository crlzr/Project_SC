// TalkJS.js
import React, { useEffect } from 'react';
import Talk from 'talkjs';

const TalkJSComponent = ({ user }) => {
  useEffect(() => {
    if (!user || !user.id) {
      console.error('userId is undefined.');
      return; // Prevent further execution if user ID is undefined
    }

    const talkjs = async () => {
      const talkSession = new Talk.Session({
        appId: process.env.REACT_APP_TALKJS_APP_ID,
        me: {
          id: user.id, // Use user.id here
          name: user.name, // Use user.name for display
          email: user.email, // Use user.email for display
        },
      });

      // This assumes the renter prop is also passed down
      const renter = {
        id: user.renter.id, // Access renter id from props
        name: user.renter.name, // Access renter name from props
        email: user.renter.email, // Access renter email from props
      };

      // Create or get the conversation
      const conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(user.id, renter.id));
      conversation.setParticipant(talkSession.me);
      conversation.setParticipant(renter);

      const inbox = talkSession.createInbox({ selected: conversation });
      inbox.mount(document.getElementById('talkjs-container'));
    };

    talkjs();

    return () => {
      Talk.destroy();
    };
  }, [user]);

  return <div id="talkjs-container" style={{ height: '400px' }} />;
};

export default TalkJSComponent;
