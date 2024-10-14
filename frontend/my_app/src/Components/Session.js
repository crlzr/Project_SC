import { Popup } from '@talkjs/react';
import { useEffect, useState, useCallback } from 'react';
import Talk from 'talkjs';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Chat({ syncUser }) {
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
            setItem(null); // Cleanup
        };
    }, [category_name, itemId]);

    const syncConversation = useCallback((session) => {
        if (!item) {
            console.warn("Item is not yet loaded, skipping conversation creation.");
            return; // Skip if item is not loaded
        }

        // Generate a unique conversation ID based on itemId
        const conversationId = `item_${itemId}`;

        const conversation = session.getOrCreateConversation(conversationId);

        const other = new Talk.User({
            id: item.Renter_id,
            name: item.Renter_name,
            photoUrl: item.Profile_pic,
            welcomeMessage: 'Hello',
        });

        conversation.setParticipant(session.me);
        conversation.setParticipant(other);

        return conversation;
    }, [item, itemId]);

    if (loading) return <div>Loading...</div>; // Optional loading state

    return (
        <Popup
            conversationId={`item_${itemId}`}
            syncConversation={syncConversation}
        />
    );
}

export default Chat;
