# Quick Start Guide

## Your Application is Running! 🚀

**Frontend**: http://localhost:5173
**Backend**: http://localhost:5000

## What You Have

✅ Complete real-time chat application
✅ End-to-end encryption
✅ Beautiful cyberpunk UI (Teal + Orange theme)
✅ Sign up and login system
✅ Media file sharing (images, videos, audio, documents)
✅ WebSocket real-time messaging
✅ MongoDB database integration
✅ Read receipts and typing indicators
✅ Online/offline status tracking
✅ Secure authentication with JWT

## How to Use

### 1. Open the Application
Navigate to: http://localhost:5173

### 2. Create Your First Account
- Click "Create Account"
- Enter a username (3-30 characters)
- Enter your email
- Create a password (6+ characters)
- Confirm your password
- Click "Create Account"

### 3. You'll be automatically logged in!

### 4. Start Chatting
- Click the **+** button in the sidebar
- Select a user from the list
- Type your message and press Enter
- Messages are automatically encrypted!

### 5. Send Files
- Click the 📎 attachment icon
- Select an image, video, or document
- File will be uploaded and sent automatically

## Testing with Multiple Users

To test the chat functionality:

1. **Register a second user**:
   - Open a new incognito/private browser window
   - Go to http://localhost:5173
   - Create a different account

2. **Send messages**:
   - In one window, select the other user
   - Send a message
   - Watch it appear in real-time in the other window!

3. **Test features**:
   - Watch typing indicators
   - See read receipts (✓ = delivered, ✓✓ = read)
   - Check online/offline status

## File Structure

```
RTCA/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── context/     # React context
│   │   ├── pages/       # Pages (Login, Register, Chat)
│   │   ├── utils/       # Utilities (API, encryption)
│   │   └── App.jsx
│   └── package.json
│
├── server/              # Node.js backend
│   ├── config/          # Database config
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded files
│   ├── .env             # Environment variables
│   └── server.js
│
└── README.md
```

## Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rtca-chat
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

### Client (.env.local)
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Common Commands

### Start Development Servers
```bash
# Start backend (in one terminal)
cd server
npm start

# Start frontend (in another terminal)
cd client
npm run dev
```

### Install Dependencies
```bash
# Install all dependencies
npm run install-all

# Or manually:
cd server && npm install
cd ../client && npm install
```

### Build for Production
```bash
cd client
npm run build
```

## Troubleshooting

### MongoDB Not Running?
```bash
# Windows - check service status
sc query MongoDB

# If not running, start it:
net start MongoDB
```

### Port Already in Use?
Change the port in `server/.env`:
```
PORT=3000
```

### Can't Connect to Server?
1. Check if server is running on http://localhost:5000
2. Check browser console for errors
3. Verify CORS settings allow localhost:5173

### Messages Not Sending?
1. Check if both users are logged in
2. Check browser console for WebSocket errors
3. Verify MongoDB is running
4. Check server logs

## Key Features to Test

- [x] User registration
- [x] User login/logout
- [x] Send text messages
- [x] Upload and send images
- [x] Upload and send videos
- [x] Upload and send files
- [x] Typing indicators
- [x] Read receipts
- [x] Online/offline status
- [x] Search users
- [x] Search conversations
- [x] Responsive design (try on mobile)

## Security Features

🔒 **Encryption**: All messages are encrypted with AES before sending
🔑 **Authentication**: JWT tokens with 7-day expiration
🛡️ **Password Hashing**: Bcrypt with salt rounds
✅ **Input Validation**: Both client and server validation
🚫 **XSS Protection**: Sanitized inputs

## Next Steps

1. **Customize the Design**: Edit CSS files in `client/src/`
2. **Add Features**: Check FEATURES.md for ideas
3. **Deploy**: See DEPLOYMENT.md for deployment guide
4. **Scale**: Add Redis for horizontal scaling

## Need Help?

- Check README.md for detailed documentation
- Check FEATURES.md for feature list
- Check DEPLOYMENT.md for deployment guide
- Check server/client logs for errors

## Color Palette

The app uses a unique cyberpunk theme:
- **Neon Teal**: #00f5ff (primary)
- **Neon Orange**: #ff6b35 (secondary)
- **Neon Yellow**: #ffd23f (accent)
- **Dark Background**: #0a0e27
- **Dark Card**: #151b3d

Change these in `client/src/index.css` under `:root` variables.

## Production Checklist

Before deploying:
- [ ] Change JWT_SECRET to a strong random key
- [ ] Set up MongoDB Atlas
- [ ] Update CORS origins
- [ ] Set up file storage (AWS S3, Cloudinary)
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Add error logging
- [ ] Test on multiple devices
- [ ] Optimize images and assets

## Enjoy Your Chat App! 🎉

You now have a fully functional, encrypted, real-time chat application with a unique UI that you can deploy and customize!
