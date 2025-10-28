import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import UserList from '../components/UserList';
import './Chat.css';

const Chat = () => {
  const { user } = useAuth();
  const { socket, connected } = useSocket();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserList, setShowUserList] = useState(false);
  const [conversations, setConversations] = useState([]);

  return (
    <div className={`chat-container ${selectedUser ? 'chat-selected' : ''}`}>
      <Sidebar
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
        onShowUserList={() => setShowUserList(true)}
        onConversationsUpdate={setConversations}
      />

      <ChatWindow
        selectedUser={selectedUser}
        onBack={() => setSelectedUser(null)}
      />

      {showUserList && (
        <UserList
          onSelectUser={(user) => {
            setSelectedUser(user);
            setShowUserList(false);
          }}
          onClose={() => setShowUserList(false)}
          existingConversations={conversations}
        />
      )}
    </div>
  );
};

export default Chat;
