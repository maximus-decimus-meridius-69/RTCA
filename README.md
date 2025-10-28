# RTCA - Real-Time Chat Application

A modern, secure real-time chat application built with React, Node.js, Socket.IO, and MongoDB.

## Features

- ⚡ **Real-Time Messaging** - Instant message delivery using WebSocket (Socket.IO)
- 📁 **Media File Sharing** - Send images, videos, audio, and files
- 🎨 **Unique Cyberpunk UI** - Modern design with neon teal and orange theme
- 👤 **User Authentication** - Secure signup and login with JWT
- 💬 **Typing Indicators** - See when someone is typing
- ✅ **Read Receipts** - Know when messages are delivered and read
- 🟢 **Online Status** - See who's online in real-time

## Tech Stack

### Frontend
- React 18
- Socket.IO Client
- Axios
- React Router
- Vite

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)
- Bcrypt (password hashing)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd RTCA
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Configure environment variables:

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rtca-chat
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

5. Start MongoDB:
```bash
mongod
```

6. Start the server:
```bash
cd server
npm start
```

7. Start the client (in a new terminal):
```bash
cd client
npm run dev
```

8. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Register** - Create a new account with username, email, and password
2. **Login** - Sign in with your credentials
3. **Start Chatting** - Click the + button to find users and start a conversation
4. **Send Messages** - Type your message and press Enter or click Send
5. **Share Files** - Click the attachment icon to upload images, videos, or files

## Security Features

- **Password Hashing** - Passwords are hashed using bcrypt
- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - All inputs are validated on both client and server
- **Protected Routes** - API routes are protected with authentication middleware

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to Render.com.

**Quick Deploy to Render:**
1. Push code to GitHub
2. Create MongoDB Atlas database
3. Deploy backend to Render (Web Service)
4. Deploy frontend to Render (Static Site)
5. Update environment variables

## Project Structure

```
RTCA/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main App component
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── server.js         # Server entry point
├── vercel.json           # Vercel configuration
└── README.md
```

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
