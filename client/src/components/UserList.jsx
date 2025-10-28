import { useState, useEffect } from 'react';
import { userAPI } from '../utils/api';
import './UserList.css';

const UserList = ({ onSelectUser, onClose, existingConversations = [] }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, [existingConversations]);

  const loadUsers = async () => {
    try {
      const response = await userAPI.getAllUsers();
      // Filter out users with existing conversations
      const existingUserIds = existingConversations.map(conv => conv._id);
      const filteredUsers = response.data.filter(user => !existingUserIds.includes(user._id));
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Load users error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      loadUsers();
      return;
    }

    try {
      const response = await userAPI.searchUsers(query);
      // Filter out users with existing conversations from search results too
      const existingUserIds = existingConversations.map(conv => conv._id);
      const filteredUsers = response.data.filter(user => !existingUserIds.includes(user._id));
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Search users error:', error);
    }
  };

  return (
    <div className="user-list-overlay" onClick={onClose}>
      <div className="user-list-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Start New Conversation</h2>
          <button onClick={onClose} className="close-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-search">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
            autoFocus
          />
        </div>

        <div className="users-list">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <p>No users found</p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="user-item"
                onClick={() => onSelectUser(user)}
              >
                <img src={user.avatar} alt={user.username} className="user-item-avatar" />
                <div className="user-item-info">
                  <h4>{user.username}</h4>
                  <p>{user.email}</p>
                </div>
                <div className={`user-item-status ${user.status}`}>
                  {user.status === 'online' ? '🟢' : '⚫'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
