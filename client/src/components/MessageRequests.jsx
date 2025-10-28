import { useState, useEffect } from 'react';
import { messageRequestAPI } from '../utils/api';
import './MessageRequests.css';

const MessageRequests = ({ onClose }) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPendingRequests();
  }, []);

  const loadPendingRequests = async () => {
    try {
      const response = await messageRequestAPI.getPendingRequests();
      setPendingRequests(response.data);
    } catch (error) {
      console.error('Load pending requests error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await messageRequestAPI.acceptRequest(requestId);
      setPendingRequests(pendingRequests.filter(req => req._id !== requestId));
    } catch (error) {
      console.error('Accept request error:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await messageRequestAPI.rejectRequest(requestId);
      setPendingRequests(pendingRequests.filter(req => req._id !== requestId));
    } catch (error) {
      console.error('Reject request error:', error);
    }
  };

  return (
    <div className="message-requests-overlay" onClick={onClose}>
      <div className="message-requests-modal" onClick={(e) => e.stopPropagation()}>
        <div className="requests-header">
          <h2>Message Requests</h2>
          <button onClick={onClose} className="close-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="requests-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading requests...</p>
            </div>
          ) : pendingRequests.length === 0 ? (
            <div className="empty-state">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p>No pending requests</p>
            </div>
          ) : (
            <div className="requests-list">
              {pendingRequests.map((request) => (
                <div key={request._id} className="request-item">
                  <div className="request-user-info">
                    <img
                      src={request.sender.avatar}
                      alt={request.sender.username}
                      className="request-avatar"
                    />
                    <div className="request-details">
                      <h4>{request.sender.username}</h4>
                      <p className="request-message">{request.message || 'wants to send you a message'}</p>
                      <span className="request-time">
                        {new Date(request.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="request-actions">
                    <button onClick={() => handleAccept(request._id)} className="accept-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Accept
                    </button>
                    <button onClick={() => handleReject(request._id)} className="reject-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageRequests;
