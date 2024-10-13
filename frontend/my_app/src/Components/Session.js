import { Session } from '@talkjs/react';
import { Popup } from '@talkjs/react';

function Chat() {
  return (
  <Session
    appId="tD4xpjcO" userId="sample_user_alice">
    <Popup conversationId="sample_conversation"></Popup>
  </Session>
  );
}

export default Chat;

