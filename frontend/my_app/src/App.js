import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Components/Navbar';
import NearbyItems from './Components/NearbyItems';
import Categories from './Components/Categories';
import CategoryItems from './Components/CategoryItems';
import ItemsListing from './Components/Items';
import Home from './Components/Home';
import './index.css';
import SuccessPage from './Components/SuccessPage';
import Profile from './Components/Profile';
import { Session, Inbox, Chatbox } from '@talkjs/react';
import Talk from 'talkjs';


// Custom hook to detect screen size for mobile responsiveness
function useMediaQuery(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches); // Set initial state
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (e) => setMatches(e.matches);
    media.addEventListener('change', listener);
    setMatches(media.matches);  // Set initial state
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
const ChatboxComponent = () => {
  const { conversationId } = useParams();  // Get conversationId from URL params

  // Handle back button click
  const handleBackClick = () => {
    window.history.back();  // Go back to the previous page
  };

  return (
    <div>
      <button onClick={handleBackClick}>Back to Conversations</button>
      <Chatbox
        conversationId={conversationId}  // Use the conversationId from params
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
};

const App = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const isMobile = useMediaQuery('(max-width: 768px)'); // Detect mobile screens


  const handleAccountClick = () => {
    loginWithRedirect();
  };
  
  const syncUser = useCallback(() => {
    if (isAuthenticated && user) {
      return new Talk.User({
        id: user.sub,
        name: user.name,
        email: user.email,
        photoUrl: user.picture || 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      });
    } else {
      // Return a default guest user if not authenticated
      return new Talk.User({
        id: 'guest',
        name: 'Guest',
        email: 'guest@example.com',
        photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      });
    }
    
  }, [isAuthenticated, user]);
  

  // const syncConversation = useCallback((session) => {
  //   // You can create a placeholder conversation or handle it in each component
  //   const conversation = session.getOrCreateConversation('new_conversation');
  //   return conversation;
  // }, []);

  if (isLoading) return <div>Loading...</div>; // Handle loading state

  return (
    <Session appId={process.env.REACT_APP_TALKJS_APP_ID} syncUser={syncUser}>
      <Router>
        <Routes>
          <Route path="/items/nearby" element={<NearbyItems />} />
           {/* Route for the list of conversations */}
          <Route
            path="/chat"
            element={
              isAuthenticated ? (
                isMobile ? (
                  // Show only chat history for mobile
                  <Inbox
                    conversationId={`conversation_${user.sub}`}
                    showChat={false} // Show only the list of conversations
                    style={{ width: '100%', height: '500px' }}
                  />
                ) : (
                  // Full chat experience for desktop
                  <Inbox
                    conversationId={`conversation_${user.sub}`}
                    style={{ width: '100%', height: '500px' }}
                  />
                )
              ) : (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <h2>You need to log in to access the chat</h2>
                  <button onClick={loginWithRedirect}>Log In</button>
                </div>
              )
            }
          />

          {/* Route for the actual conversation */}
          <Route
            path="/chat/:conversationId"
            element={
              isAuthenticated ? (
                isMobile ? (
                  // Display chatbox only on mobile
                  <ChatboxComponent />
                ) : (
                  <ChatboxComponent />
                )
              ) : (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <h2>You need to log in to access the chat</h2>
                  <button onClick={loginWithRedirect}>Log In</button>
                </div>
              )
            }
          />
          <Route path="/" element={<Categories />} />
          <Route path="/profile" element={<><Home /><Profile /></>} />
          <Route path="/category/:category_name" element={<CategoryItems />} />
          <Route path="/category/:category_name/:itemId" element={<ItemsListing/>} />
          {/* syncConversation={syncConversation} */}
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <Navbar onAccountClick={handleAccountClick} />
      </Router>
    </Session>
  );
};

export default App;
