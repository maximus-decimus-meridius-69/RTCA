# RTCA User Guide

## Welcome to RTCA!

Your real-time chat application is fully set up and running.

## Access the Application

**Frontend**: http://localhost:5173
**Backend**: http://localhost:5000

## Test Users Created

Two dummy users have been created for easy testing:

### User 1 - Alice
- **Email**: alice@example.com
- **Password**: password123

### User 2 - Bob
- **Email**: bob@example.com
- **Password**: password123

## Quick Test Instructions

### Testing Chat Between Two Users

1. **First Browser Window**:
   - Go to http://localhost:5173
   - Login with alice@example.com / password123
   - Click the + button to see all users
   - Click on "bob" to start a conversation

2. **Second Browser Window (Incognito/Private)**:
   - Open a new incognito/private window
   - Go to http://localhost:5173
   - Login with bob@example.com / password123
   - Click on "alice" in the conversation list (or + button to find her)

3. **Start Chatting**:
   - Type a message in either window
   - Watch it appear in real-time in both windows
   - See typing indicators when someone is typing
   - Check read receipts (✓ delivered, ✓✓ read)

## Main Features

### 1. Authentication

**Sign Up**:
- Click "Create Account" on login page
- Fill in username, email, and password
- Automatic login after registration

**Login**:
- Enter email and password
- Click "Access System"

**Profile**:
- Click on your avatar or the profile icon in the sidebar
- View your information
- See your public encryption key
- View account statistics
- Change settings (coming soon)

### 2. Messaging

**Send Text Messages**:
- Type in the message input box
- Press Enter or click the send button

**Send Files**:
- Click the attachment (📎) icon
- Select a file (image, video, audio, or document)
- File uploads automatically and sends

**Typing Indicators**:
- See when the other person is typing
- Three animated dots appear below their last message

**Read Receipts**:
- ✓ = Message delivered
- ✓✓ = Message read

### 3. Conversations

**Start New Conversation**:
- Click the + button in the sidebar
- Search for users by name or email
- Click on a user to start chatting

**Search Conversations**:
- Use the search box in the sidebar
- Type username to filter conversations

**View Conversation History**:
- Scroll up to view previous messages
- Last 100 messages are loaded

### 4. Profile Page

Access your profile by:
- Clicking on your avatar in the sidebar
- Clicking the profile icon (👤) next to logout

**Profile Features**:
- View personal information
- View account statistics
- Change password (coming soon)
- Logout

### 5. User Interface

**Sidebar**:
- User profile section (click to view profile)
- Search conversations
- Active conversations list
- New chat button (+)
- Profile button (👤)
- Logout button

**Chat Window**:
- User header with online status
- Message history
- Typing indicators
- File attachment button
- Message input field
- Send button

**Profile Page**:
- Avatar section
- Personal information editor
- Account actions
- Statistics dashboard

## Keyboard Shortcuts

- **Enter**: Send message
- **Escape**: Close modals
- **Ctrl/Cmd + K**: Focus search (browser default)

## Security Features

### Password Security
- Passwords are hashed with bcrypt
- Never stored in plain text
- Secure token-based authentication

## File Sharing

### Supported File Types
- **Images**: JPEG, JPG, PNG, GIF
- **Videos**: MP4, WEBM
- **Audio**: MP3, WAV
- **Documents**: PDF, DOC, DOCX

### File Size Limit
- Maximum: 50MB per file

### How Files Are Handled
1. File is uploaded to server
2. Secure URL is generated
3. Message with file is sent
4. Recipient can view/download

## Tips & Best Practices

### For Best Experience:

1. **Keep Browser Updated**: Use latest version of Chrome, Firefox, or Edge
2. **Stable Connection**: Ensure good internet connection for real-time features
3. **Don't Share Login**: Each user should have their own account
4. **Secure Passwords**: Use strong, unique passwords

### Troubleshooting:

**Messages Not Sending?**
- Check internet connection
- Verify you're logged in
- Refresh the page
- Check console for errors

**Can't See Online Status?**
- Ensure WebSocket is connected (green indicator)
- Check if server is running
- Try refreshing the page

**Files Not Uploading?**
- Check file size (max 50MB)
- Verify file type is supported
- Ensure server has write permissions

## Privacy & Data

### What's Stored:
- Username, email (hashed password)
- Chat messages
- File uploads
- Online status

### Data Location:
- Messages: MongoDB database
- Files: Server uploads folder

## Mobile Usage

The app is fully responsive and works on mobile devices:
- Use portrait mode for best experience
- Sidebar becomes full-screen on mobile
- All features work on mobile browsers
- Touch-friendly interface

## Creating More Users

You can create unlimited users:
1. Logout from current account
2. Click "Create Account"
3. Fill in new user details
4. Start chatting!

Or use multiple browsers/devices to test simultaneously.

## What's Next?

### Planned Features:
- Group chats
- Voice/Video calling
- Message editing/deletion
- Message search
- User blocking
- Push notifications
- Dark/Light theme toggle
- Custom avatar upload
- Message reactions

### Customization:
- Edit colors in `client/src/index.css`
- Modify layouts in component files
- Add new features as needed

## Support & Development

### Project Files:
- `README.md` - Complete project documentation
- `QUICKSTART.md` - Quick start guide
- `DEPLOYMENT.md` - Deployment instructions
- `FEATURES.md` - Feature documentation
- `PROJECT_STRUCTURE.md` - Code structure
- `USER_GUIDE.md` - This file

### Development:
- Server code: `server/`
- Client code: `client/src/`
- Database models: `server/models/`
- React components: `client/src/components/`

### Getting Help:
- Check browser console for errors
- Check server logs for backend issues
- Review documentation files
- Check MongoDB connection

## Enjoy Your Chat Application!

You now have a fully functional real-time chat application with:
- ✅ Beautiful unique UI
- ✅ Real-time messaging
- ✅ File sharing
- ✅ User profiles
- ✅ Typing indicators
- ✅ Read receipts
- ✅ Online status tracking

Start chatting! 💬
