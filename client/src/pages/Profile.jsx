import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('profile');
  const [displayName, setDisplayName] = useState(user?.displayName || user?.username || '');
  const [isPrivate, setIsPrivate] = useState(user?.isPrivate || false);
  const [allowGroupAdd, setAllowGroupAdd] = useState(user?.allowGroupAdd || 'everyone');
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'blocked') {
      loadBlockedUsers();
    } else if (activeTab === 'starred') {
      loadStarredMessages();
    }
  }, [activeTab]);

  const loadBlockedUsers = async () => {
    try {
      const response = await authAPI.getBlockedUsers();
      setBlockedUsers(response.data.blockedUsers);
    } catch (error) {
      console.error('Load blocked users error:', error);
    }
  };

  const loadStarredMessages = async () => {
    try {
      const response = await authAPI.getStarredMessages();
      setStarredMessages(response.data.messages);
    } catch (error) {
      console.error('Load starred messages error:', error);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    try {
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          await authAPI.uploadAvatar(reader.result);
          setStatusMessage('Avatar updated successfully!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          setError('Failed to upload avatar');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setError('Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setError('');
      await authAPI.updateProfile({ displayName });
      setStatusMessage('Profile updated successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrivacy = async () => {
    try {
      setLoading(true);
      setError('');
      await authAPI.updateProfile({ isPrivate, allowGroupAdd });
      setStatusMessage('Privacy settings updated!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      setError('Failed to update privacy settings');
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async (userId) => {
    try {
      await authAPI.unblockUser(userId);
      setBlockedUsers(blockedUsers.filter(u => u._id !== userId));
      setStatusMessage('User unblocked');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      setError('Failed to unblock user');
    }
  };

  const handleUnstarMessage = async (messageId) => {
    try {
      await authAPI.unstarMessage(messageId);
      setStarredMessages(starredMessages.filter(m => m._id !== messageId));
      setStatusMessage('Message unstarred');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      setError('Failed to unstar message');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <button onClick={() => navigate('/chat')} className="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Chat
        </button>

        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar-container" onClick={handleAvatarClick}>
              <img src={user?.avatar} alt={user?.username} className="profile-avatar" />
              <div className="avatar-overlay">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <span>Change Photo</span>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          <div className="user-details">
            <h1>{user?.username}</h1>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>

        {statusMessage && <div className="status-message success">{statusMessage}</div>}
        {error && <div className="status-message error">{error}</div>}

        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy
          </button>
          <button
            className={`tab-button ${activeTab === 'blocked' ? 'active' : ''}`}
            onClick={() => setActiveTab('blocked')}
          >
            Blocked Users
          </button>
          <button
            className={`tab-button ${activeTab === 'starred' ? 'active' : ''}`}
            onClick={() => setActiveTab('starred')}
          >
            Starred Messages
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h2>Edit Profile</h2>
              <div className="form-group">
                <label>Username (Read-only)</label>
                <input
                  type="text"
                  value={user?.username}
                  disabled
                  className="form-input disabled"
                />
              </div>
              <div className="form-group">
                <label>Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="form-input"
                  placeholder="Enter display name"
                />
              </div>
              <div className="form-group">
                <label>Email (Read-only)</label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="form-input disabled"
                />
              </div>
              <button onClick={handleSaveProfile} className="save-button" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="tab-content">
              <h2>Privacy Settings</h2>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Private Account</h3>
                  <p>When enabled, users must send a request to message you</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Group Add Permission</h3>
                  <p>Control who can add you to groups</p>
                </div>
                <select
                  value={allowGroupAdd}
                  onChange={(e) => setAllowGroupAdd(e.target.value)}
                  className="form-select"
                >
                  <option value="everyone">Everyone</option>
                  <option value="approval">Require Approval</option>
                </select>
              </div>

              <button onClick={handleSavePrivacy} className="save-button" disabled={loading}>
                {loading ? 'Saving...' : 'Save Privacy Settings'}
              </button>
            </div>
          )}

          {activeTab === 'blocked' && (
            <div className="tab-content">
              <h2>Blocked Users</h2>
              {blockedUsers.length === 0 ? (
                <div className="empty-state">
                  <p>No blocked users</p>
                </div>
              ) : (
                <div className="blocked-list">
                  {blockedUsers.map((blockedUser) => (
                    <div key={blockedUser._id} className="blocked-item">
                      <img src={blockedUser.avatar} alt={blockedUser.username} className="blocked-avatar" />
                      <div className="blocked-info">
                        <h4>{blockedUser.displayName || blockedUser.username}</h4>
                        <p>@{blockedUser.username}</p>
                      </div>
                      <button onClick={() => handleUnblock(blockedUser._id)} className="unblock-button">
                        Unblock
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'starred' && (
            <div className="tab-content">
              <h2>Starred Messages</h2>
              {starredMessages.length === 0 ? (
                <div className="empty-state">
                  <p>No starred messages</p>
                </div>
              ) : (
                <div className="starred-list">
                  {starredMessages.map((message) => (
                    <div key={message._id} className="starred-item">
                      <div className="starred-header">
                        <img
                          src={message.sender.avatar}
                          alt={message.sender.username}
                          className="starred-avatar"
                        />
                        <div className="starred-info">
                          <h4>{message.sender.displayName || message.sender.username}</h4>
                          <p className="starred-date">
                            {new Date(message.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button onClick={() => handleUnstarMessage(message._id)} className="unstar-button">
                          ⭐
                        </button>
                      </div>
                      <div className="starred-content">
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
