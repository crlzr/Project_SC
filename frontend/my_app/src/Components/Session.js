import { Session } from '@talkjs/react';
import { Popup } from '@talkjs/react';
import { useEffect, useState, useCallback } from 'react';
import Talk from 'talkjs';

function Chat() {
  const syncUser = useCallback(() => {
    // Rentee (person renting out stuff)
    return new Talk.User({
      id: 'nina',
      name: 'Nina',
      email: 'nina@example.com',
      photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
      welcomeMessage: 'Hi!',
    });
  }, []);

  const syncConversation = useCallback((session) => {
    const conversation = session.getOrCreateConversation('new_conversation');

    // Renter
    const other = new Talk.User({
      id: 'frank',
      name: 'Frank',
      email: 'frank@example.com',
      photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
      welcomeMessage: 'Hey, how can I help?',
    });

    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);

  return (
    <Session appId="tD4xpjcO" syncUser={syncUser}>
      <Popup
        conversationId="new_conversation"
        syncConversation={syncConversation}
      />
    </Session>
  );
}

export default Chat;
