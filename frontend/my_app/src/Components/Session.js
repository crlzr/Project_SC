import { Session } from '@talkjs/react';
import { Popup } from '@talkjs/react';
import { useEffect, useState, useCallback } from 'react';
import Talk from 'talkjs';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';


function Chat() {
    const { category_name, itemId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItemDetails = async () => {
          setLoading(true);
          try {
            const response = await axios.get(`http://localhost:5004/${category_name}/${itemId}`);
            setItem(response.data);
          } catch (error) {
            console.error('Error fetching item details:', error);
          } finally {
            setLoading(false);
          }
        };

        fetchItemDetails();

        return () => {
            // Cleanup any potential ongoing fetches or subscriptions
            setItem(null);
          };
        }, [category_name, itemId]);


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
        id: item.Renter_id,
        name: item.Renter_name,
        photoUrl: item.Profile_pic,
        welcomeMessage: 'Hello',

        // id: 'frank',
        // name: 'Frank',
        // email: 'frank@example.com',
        // photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
        // welcomeMessage: 'Hey, how can I help?',
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
