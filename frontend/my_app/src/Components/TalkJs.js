// TalkJS.js
import React, { useEffect } from 'react';
import Talk from 'talkjs';

const TalkJSComponent = ({ user }) => {
  useEffect(() => {
    if (!user || !user.id) {
      console.error('userId is undefined.');
      return;
    }

    const initTalkJS = async () => {
      const talkSession = new Talk.Session({
        appId: process.env.REACT_APP_TALKJS_APP_ID,
        me: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });

      const renter = {
        id: user.renter.id,
        name: user.renter.name,
        email: user.renter.email,
      };

      const conversation = talkSession.getOrCreateConversation(
        Talk.oneOnOneId(user.id, renter.id)
      );
      conversation.setAttributes({
        subject: `Chat with ${renter.name}`,
      });

      talkSession.mount(document.getElementById('talkjs-container')); // Ensure this matches your container ID
    };

    initTalkJS();

    return () => {
      Talk.destroy(); // Clean up TalkJS session on unmount
    };
  }, [user]);

  return <div id="talkjs-container" style={{ width: '100%', height: '500px' }} />;
};

export default TalkJSComponent;
