import { Session } from '@talkjs/react';
import { Popup } from '@talkjs/react';
import { useEffect, useState } from 'react';


function Chat(userId, conversationId) {
  return (
  <Session
    appId="tD4xpjcO" userId="sample_user_alice">
    <Popup conversationId="sample_conversation" />
    </Session>
  );
}

export default Chat;


