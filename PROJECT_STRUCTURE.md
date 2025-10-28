# Project Structure Documentation

## Complete File Overview

### Root Directory
```
RTCA/
├── .gitignore                 # Git ignore configuration
├── package.json               # Root package.json for scripts
├── vercel.json               # Vercel deployment config
├── README.md                 # Main documentation
├── QUICKSTART.md            # Quick start guide
├── DEPLOYMENT.md            # Deployment instructions
├── FEATURES.md              # Feature documentation
└── PROJECT_STRUCTURE.md     # This file
```

## Client Directory (`client/`)

### Main Files
```
client/
├── package.json              # Frontend dependencies
├── vite.config.js           # Vite configuration
├── index.html               # HTML entry point
├── .env.local               # Local environment variables
└── .env.production          # Production environment variables
```

### Source Files (`client/src/`)

#### Entry Point
```
src/
├── main.jsx                 # React app entry point
├── App.jsx                  # Main app component with routing
├── index.css                # Global styles and theme variables
└── App.css                  # App-specific styles
```

#### Context Providers (`client/src/context/`)
```
context/
├── AuthContext.jsx          # Authentication state management
│   ├── AuthProvider         # Wraps app with auth context
│   ├── useAuth hook         # Hook to access auth state
│   ├── register()           # User registration function
│   ├── login()              # User login function
│   └── logout()             # User logout function
│
└── SocketContext.jsx        # WebSocket connection management
    ├── SocketProvider       # Wraps app with socket context
    ├── useSocket hook       # Hook to access socket
    └── Connection handling  # Auto connect/disconnect
```

#### Pages (`client/src/pages/`)
```
pages/
├── Login.jsx                # Login page component
│   ├── Login form
│   ├── Error handling
│   ├── Loading states
│   └── Redirect after login
│
├── Login.css                # Login/Register shared styles
│   ├── Glitch animation
│   ├── Neon effects
│   ├── Form styling
│   └── Responsive design
│
├── Register.jsx             # Registration page component
│   ├── Registration form
│   ├── Password validation
│   ├── Error handling
│   └── Auto-login after register
│
├── Chat.jsx                 # Main chat page component
│   ├── Layout management
│   ├── User selection
│   ├── Modal control
│   └── Connection status
│
└── Chat.css                 # Chat page styles
    ├── Grid layout
    ├── Connection indicator
    └── Responsive breakpoints
```

#### Components (`client/src/components/`)
```
components/
├── Sidebar.jsx              # Conversation sidebar
│   ├── User profile display
│   ├── Search functionality
│   ├── Conversation list
│   ├── New chat button
│   └── Real-time updates
│
├── Sidebar.css              # Sidebar styles
│   ├── Profile section
│   ├── Search bar
│   ├── Conversation items
│   └── Animations
│
├── ChatWindow.jsx           # Main chat interface
│   ├── Chat header
│   ├── Message list
│   ├── Message input
│   ├── File upload
│   ├── Typing indicators
│   └── Real-time messaging
│
├── ChatWindow.css           # Chat window styles
│   ├── Header styling
│   ├── Message container
│   ├── Input area
│   └── Media queries
│
├── MessageItem.jsx          # Individual message component
│   ├── Message decryption
│   ├── Content rendering
│   ├── Media display
│   ├── File attachments
│   └── Timestamp/status
│
├── MessageItem.css          # Message styles
│   ├── Bubble styling
│   ├── Media previews
│   ├── File cards
│   └── Animations
│
├── UserList.jsx             # User selection modal
│   ├── User search
│   ├── User listing
│   ├── Online status
│   └── Click to chat
│
└── UserList.css             # User list modal styles
    ├── Modal overlay
    ├── User items
    ├── Search input
    └── Animations
```

#### Utilities (`client/src/utils/`)
```
utils/
├── api.js                   # API client configuration
│   ├── Axios instance
│   ├── Request interceptors
│   ├── Response interceptors
│   ├── authAPI methods
│   ├── userAPI methods
│   └── messageAPI methods
│
└── encryption.js            # Encryption utilities
    ├── generateKeyPair()    # Generate encryption keys
    ├── encryptMessage()     # Encrypt message content
    ├── decryptMessage()     # Decrypt message content
    ├── storeKeys()          # Save keys to storage
    ├── getStoredKeys()      # Retrieve stored keys
    └── clearKeys()          # Remove keys on logout
```

## Server Directory (`server/`)

### Main Files
```
server/
├── package.json             # Backend dependencies
├── .env                     # Environment variables
└── server.js                # Express + Socket.IO server
    ├── Express setup
    ├── Socket.IO configuration
    ├── MongoDB connection
    ├── Middleware setup
    ├── Route mounting
    └── Event handlers
```

### Configuration (`server/config/`)
```
config/
└── database.js              # MongoDB connection
    ├── connectDB()          # Connect to MongoDB
    └── Error handling
```

### Middleware (`server/middleware/`)
```
middleware/
└── auth.js                  # JWT authentication middleware
    ├── Token verification
    ├── User lookup
    └── Request protection
```

### Models (`server/models/`)
```
models/
├── User.js                  # User schema
│   ├── username (unique)
│   ├── email (unique)
│   ├── password (hashed)
│   ├── publicKey
│   ├── avatar
│   ├── status
│   ├── lastSeen
│   ├── Pre-save hooks
│   └── comparePassword()
│
└── Message.js               # Message schema
    ├── sender (ref)
    ├── recipient (ref)
    ├── encryptedContent
    ├── messageType
    ├── fileUrl
    ├── fileName
    ├── fileSize
    ├── isRead
    ├── readAt
    ├── deliveredAt
    └── Indexes
```

### Routes (`server/routes/`)
```
routes/
├── auth.js                  # Authentication routes
│   ├── POST /register       # User registration
│   ├── POST /login          # User login
│   ├── GET /me              # Get current user
│   └── POST /logout         # User logout
│
├── users.js                 # User routes
│   ├── GET /                # Get all users
│   ├── GET /:id             # Get user by ID
│   └── GET /search/:query   # Search users
│
└── messages.js              # Message routes
    ├── GET /conversation/:userId     # Get conversation
    ├── GET /conversations            # Get all conversations
    ├── PUT /:messageId/read          # Mark as read
    └── POST /upload                   # Upload file
```

### Uploads (`server/uploads/`)
```
uploads/                     # User-uploaded files
└── [dynamic files]          # Images, videos, documents
```

## Key Technologies Used

### Frontend Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "socket.io-client": "^4.8.1",
  "axios": "^1.7.9",
  "crypto-js": "^4.2.0"
}
```

### Backend Dependencies
```json
{
  "express": "^5.1.0",
  "socket.io": "^4.8.1",
  "mongoose": "^8.19.2",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^3.0.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "multer": "^2.0.2",
  "crypto-js": "^4.2.0"
}
```

## Data Flow

### Authentication Flow
```
1. User submits credentials
2. Client → POST /api/auth/login
3. Server validates credentials
4. Server generates JWT token
5. Server returns token + user data
6. Client stores token in localStorage
7. Client redirects to /chat
```

### Message Flow
```
1. User types message
2. Message encrypted with recipient's public key
3. Client → socket.emit('sendMessage')
4. Server receives encrypted message
5. Server saves to MongoDB
6. Server → socket.to(recipientId).emit('receiveMessage')
7. Recipient receives message
8. Recipient decrypts with private key
9. Message displayed in UI
```

### File Upload Flow
```
1. User selects file
2. Client → POST /api/messages/upload (multipart/form-data)
3. Server validates file type
4. Multer saves file to /uploads
5. Server returns file URL
6. Client sends message with file URL
7. Recipient receives message
8. File displayed/downloadable in UI
```

## WebSocket Events

### Client Events (Emit)
- `sendMessage` - Send encrypted message
- `typing` - Notify typing status
- `messageRead` - Mark message as read

### Server Events (Emit)
- `receiveMessage` - New message received
- `userTyping` - User typing notification
- `messageReadReceipt` - Message read confirmation
- `userStatusChange` - Online/offline status
- `messageDelivered` - Delivery confirmation

## Database Collections

### users
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  publicKey: String,
  avatar: String,
  status: String,
  lastSeen: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### messages
```javascript
{
  _id: ObjectId,
  sender: ObjectId,
  recipient: ObjectId,
  encryptedContent: String,
  messageType: String,
  fileUrl: String,
  fileName: String,
  fileSize: Number,
  isRead: Boolean,
  readAt: Date,
  deliveredAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Styling Architecture

### CSS Variables (index.css)
```css
--neon-teal: #00f5ff
--neon-orange: #ff6b35
--neon-yellow: #ffd23f
--dark-bg: #0a0e27
--dark-card: #151b3d
--dark-hover: #1f2847
--text-primary: #e0e6ff
--text-secondary: #8b92b8
```

### Component Styles
Each component has its own CSS file for:
- Layout
- Colors
- Animations
- Responsive design
- Hover effects

## Security Layers

1. **Authentication**: JWT tokens
2. **Authorization**: Protected routes
3. **Encryption**: End-to-end AES encryption
4. **Password Security**: Bcrypt hashing
5. **Input Validation**: Client and server
6. **File Validation**: Type and size limits
7. **CORS**: Controlled origins
8. **XSS Protection**: Input sanitization

## Performance Optimizations

1. **Message Pagination**: 100 message limit
2. **Efficient Queries**: MongoDB indexes
3. **WebSocket**: Persistent connections
4. **Lazy Loading**: Conversations loaded on demand
5. **Optimistic Updates**: Instant UI feedback
6. **Code Splitting**: React lazy loading ready
7. **Asset Optimization**: Vite bundling

## Future Scalability

Ready for:
- Redis adapter for Socket.IO
- CDN integration
- Database sharding
- Horizontal scaling
- Microservices architecture
- Message queue (RabbitMQ/Redis)
- Load balancing
