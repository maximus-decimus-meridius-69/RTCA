# RTCA Features Documentation

## Core Features

### 1. User Authentication & Security

#### Sign Up
- Username validation (3-30 characters)
- Email validation
- Password strength requirement (minimum 6 characters)
- Automatic avatar generation using DiceBear API
- Secure password hashing with bcrypt

#### Login
- Email and password authentication
- JWT token generation (7-day expiration)
- Session persistence with localStorage

#### Security Features
- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Client and server-side validation
- **Protected Routes**: Authentication middleware
- **XSS Protection**: Input sanitization
- **CORS Configuration**: Controlled access

### 2. Real-Time Messaging

#### WebSocket Communication
- Socket.IO for real-time bidirectional communication
- Automatic reconnection on disconnect
- Connection status indicator
- User online/offline status tracking

#### Message Features
- **Text Messages**: Real-time text messaging
- **Typing Indicators**: See when someone is typing
- **Read Receipts**: Message delivered and read status
- **Message Timestamps**: Accurate time tracking
- **Message History**: Persistent message storage

### 3. Media File Sharing

#### Supported File Types
- **Images**: JPEG, JPG, PNG, GIF
- **Videos**: MP4, WEBM
- **Audio**: MP3, WAV
- **Documents**: PDF, DOC, DOCX

#### File Upload Features
- Drag and drop support (via file input)
- 50MB file size limit
- File type validation
- Progress indication
- Secure file storage
- Automatic file URL generation

#### Media Display
- **Images**: Inline preview with zoom on hover
- **Videos**: Embedded video player with controls
- **Audio**: Audio player with controls
- **Files**: Download button with file info

### 4. User Interface

#### Design Theme
- **Cyberpunk/Neon Aesthetic**: Unique visual style
- **Color Palette**:
  - Neon Teal (#00f5ff) - Primary accent
  - Neon Orange (#ff6b35) - Secondary accent
  - Neon Yellow (#ffd23f) - Tertiary accent
  - Dark backgrounds with gradients
- **Animations**: Smooth transitions and effects
- **Responsive Design**: Mobile-friendly layout

#### UI Components

**Login/Register Pages**
- Glitch text effect for branding
- Animated background gradients
- Neon glow effects
- Feature highlights
- Error/success messages
- Loading states

**Sidebar**
- User profile display
- Search conversations
- Conversation list with previews
- New chat button
- Online status indicators
- Last message preview

**Chat Window**
- User header with status
- Scrollable message area
- Message bubbles with animations
- Typing indicators
- File attachment button
- Message input with auto-resize
- Send button

**User List Modal**
- Search functionality
- User avatars
- Online/offline status
- Smooth animations
- Modal overlay

### 5. Conversation Management

#### Features
- List all conversations
- Search conversations by username
- Last message preview
- Unread message indicators
- Conversation sorting by latest message
- Click to open conversation

### 6. User Discovery

#### Search & Find Users
- View all registered users
- Search by username or email
- Real-time search results
- Online status display
- Click to start conversation

### 7. Additional Features

#### Connection Status
- Real-time connection indicator
- Visual feedback for online/offline
- Automatic reconnection attempts

#### User Experience
- Smooth scrolling to latest messages
- Auto-scroll on new message
- Message grouping by sender
- Timestamp display
- Avatar display
- Username display

#### Performance
- Optimized message loading (100 messages limit)
- Lazy loading conversations
- Efficient re-renders with React
- Background file uploads
- WebSocket connection pooling

## Technical Specifications

### Frontend Stack
```
- React 18.3.1
- React Router DOM 7.1.1
- Socket.IO Client 4.8.1
- Axios 1.7.9
- Vite 7.1.12
```

### Backend Stack
```
- Node.js & Express 5.1.0
- Socket.IO 4.8.1
- MongoDB & Mongoose 8.19.2
- JWT (jsonwebtoken 9.0.2)
- Bcrypt (bcryptjs 3.0.2)
- Multer 2.0.2
```

### Database Schema

#### User Model
```javascript
{
  username: String (unique, 3-30 chars)
  email: String (unique, lowercase)
  password: String (hashed)
  avatar: String (URL)
  status: String (online/offline/away)
  lastSeen: Date
  timestamps: true
}
```

#### Message Model
```javascript
{
  sender: ObjectId (ref: User)
  recipient: ObjectId (ref: User)
  content: String
  messageType: String (text/image/video/audio/file)
  fileUrl: String
  fileName: String
  fileSize: Number
  isRead: Boolean
  readAt: Date
  deliveredAt: Date
  timestamps: true
}
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- POST `/api/auth/logout` - Logout user

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- GET `/api/users/search/:query` - Search users

### Messages
- GET `/api/messages/conversation/:userId` - Get conversation
- GET `/api/messages/conversations` - Get all conversations
- PUT `/api/messages/:messageId/read` - Mark message as read
- POST `/api/messages/upload` - Upload file

### WebSocket Events

#### Client to Server
- `sendMessage` - Send a message
- `typing` - Send typing status
- `messageRead` - Mark message as read

#### Server to Client
- `receiveMessage` - Receive new message
- `userTyping` - User typing status
- `messageReadReceipt` - Message read confirmation
- `userStatusChange` - User online/offline status
- `messageDelivered` - Message delivery confirmation

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## System Requirements

### Development
- Node.js 14+
- MongoDB 4.4+
- 2GB RAM minimum
- Modern web browser

### Production
- Node.js 14+
- MongoDB Atlas or hosted MongoDB
- SSL/TLS certificate
- Cloud hosting (Vercel, Railway, Render, etc.)

## Future Enhancement Ideas

- Group chats
- Voice/Video calling
- Message editing and deletion
- Message reactions
- User blocking
- Push notifications
- Message search
- File preview thumbnails
- Dark/Light theme toggle
- Custom avatars upload
- User settings
- Last seen privacy
- Message forwarding
- Multiple device support
- Desktop application (Electron)
