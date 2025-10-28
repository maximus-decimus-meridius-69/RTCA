import { useState } from 'react';
import { messageAPI, authAPI } from '../utils/api';
import './MessageItem.css';

const MessageItem = ({ message, isSent }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const getMessageContent = () => {
    return message.content || '[No content]';
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleStarMessage = async () => {
    try {
      await authAPI.starMessage(message._id);
      setShowContextMenu(false);
      alert('Message starred!');
    } catch (error) {
      console.error('Star message error:', error);
    }
  };

  const handlePinMessage = async () => {
    try {
      if (message.isPinned) {
        await messageAPI.unpinMessage(message._id);
        alert('Message unpinned!');
      } else {
        await messageAPI.pinMessage(message._id);
        alert('Message pinned!');
      }
      setShowContextMenu(false);
    } catch (error) {
      console.error('Pin message error:', error);
    }
  };

  const handleDeleteMessage = async () => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    setShowContextMenu(false);
    // TODO: Implement delete message on backend
    alert('Delete functionality coming soon');
  };

  const renderContent = () => {
    if (message.messageType === 'text') {
      return <p className="message-text">{getMessageContent()}</p>;
    }

    if (message.messageType === 'image') {
      return (
        <div className="message-media">
          <img
            src={`http://localhost:5000${message.fileUrl}`}
            alt={message.fileName}
            className="message-image"
          />
          <p className="media-caption">{getMessageContent()}</p>
        </div>
      );
    }

    if (message.messageType === 'video') {
      return (
        <div className="message-media">
          <video
            src={`http://localhost:5000${message.fileUrl}`}
            controls
            className="message-video"
          />
          <p className="media-caption">{getMessageContent()}</p>
        </div>
      );
    }

    if (message.messageType === 'audio' || message.messageType === 'voice') {
      return (
        <div className="message-media">
          <audio src={`http://localhost:5000${message.fileUrl}`} controls className="message-audio" />
          <p className="media-caption">{getMessageContent()}</p>
        </div>
      );
    }

    if (message.messageType === 'sticker') {
      return (
        <div className="message-sticker">
          <img src={`http://localhost:5000${message.fileUrl}`} alt="Sticker" className="sticker-image" />
        </div>
      );
    }

    if (message.messageType === 'gif') {
      return (
        <div className="message-gif">
          <img src={`http://localhost:5000${message.fileUrl}`} alt="GIF" className="gif-image" />
        </div>
      );
    }

    // Generic file
    return (
      <a
        href={`http://localhost:5000${message.fileUrl}`}
        download={message.fileName}
        className="message-file"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="file-icon">📄</div>
        <div className="file-info">
          <p className="file-name">{message.fileName}</p>
          <p className="file-size">{formatFileSize(message.fileSize)}</p>
        </div>
        <div className="download-icon">⬇️</div>
      </a>
    );
  };

  return (
    <>
      <div
        className={`message-item ${isSent ? 'sent' : 'received'} ${message.isPinned ? 'pinned' : ''}`}
        onContextMenu={handleContextMenu}
      >
        {!isSent && (
          <img
            src={message.sender.avatar}
            alt={message.sender.username}
            className="message-avatar"
          />
        )}
        <div className="message-bubble">
          {message.isPinned && <div className="pin-indicator">📌 Pinned</div>}
          {renderContent()}
          <div className="message-meta">
            <span className="message-time">{formatTime(message.createdAt)}</span>
            {isSent && (
              <span className={`message-status ${message.isRead ? 'read' : message.createdAt ? 'delivered' : 'sent'}`}>
                {message.isRead ? '✓✓' : '✓✓'}
              </span>
            )}
          </div>
        </div>
      </div>

      {showContextMenu && (
        <>
          <div className="context-menu-overlay" onClick={() => setShowContextMenu(false)} />
          <div
            className="message-context-menu"
            style={{ top: contextMenuPos.y, left: contextMenuPos.x }}
          >
            <button onClick={handleStarMessage} className="context-menu-item">
              <span>⭐</span>
              Star Message
            </button>
            <button onClick={handlePinMessage} className="context-menu-item">
              <span>📌</span>
              {message.isPinned ? 'Unpin' : 'Pin'} Message
            </button>
            {isSent && (
              <button onClick={handleDeleteMessage} className="context-menu-item danger">
                <span>🗑️</span>
                Delete Message
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MessageItem;
