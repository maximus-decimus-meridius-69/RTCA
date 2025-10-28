# 🚀 RTCA Deployment Guide for Render

This guide will walk you through deploying your Real-Time Chat Application to Render.com.

## 📋 Prerequisites

Before deploying, make sure you have:

1. ✅ A GitHub account
2. ✅ A Render.com account (free tier available)
3. ✅ A MongoDB Atlas account (free tier available)
4. ✅ Git installed on your computer

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (use the free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. **Important**: Replace `<password>` with your actual database password
7. Add `/rtca` at the end of the connection string before the `?` symbol

Example: `mongodb+srv://user:pass123@cluster.mongodb.net/rtca?retryWrites=true&w=majority`

## 📤 Step 2: Push Your Code to GitHub

1. Open terminal/command prompt in your project folder
2. Run these commands:

```bash
git init
git add .
git commit -m "Initial commit - RTCA ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

## 🖥️ Step 3: Deploy Backend to Render

### 3.1 Create Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the backend:

   **Basic Settings:**
   - **Name**: `rtca-backend` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 3.2 Add Environment Variables

In the "Environment" section, add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | Your MongoDB connection string from Step 1 |
| `JWT_SECRET` | Create a random secret (e.g., `my-super-secret-jwt-key-2024-rtca-xyz123`) |
| `CLIENT_URL` | Leave this empty for now (we'll update it after frontend deployment) |

### 3.3 Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment to complete (5-10 minutes)
3. Once deployed, copy your backend URL (e.g., `https://rtca-backend.onrender.com`)
4. **Save this URL** - you'll need it for frontend deployment

## 🎨 Step 4: Deploy Frontend to Render

### 4.1 Create Frontend Service

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure the frontend:

   **Basic Settings:**
   - **Name**: `rtca-frontend` (or any name you prefer)
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 4.2 Add Frontend Environment Variables

In the "Environment" section, add these variables:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://YOUR_BACKEND_URL.onrender.com/api` |
| `VITE_SOCKET_URL` | `https://YOUR_BACKEND_URL.onrender.com` |

**Important**: Replace `YOUR_BACKEND_URL` with the actual backend URL from Step 3.3

### 4.3 Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for deployment (3-5 minutes)
3. Once deployed, copy your frontend URL (e.g., `https://rtca-frontend.onrender.com`)

## 🔄 Step 5: Update Backend CORS Settings

Now that you have your frontend URL, you need to update the backend:

1. Go back to your **Backend Service** in Render
2. Click **"Environment"**
3. Update the `CLIENT_URL` variable to your frontend URL from Step 4.3
4. Click **"Save Changes"**
5. Render will automatically redeploy the backend

## ✅ Step 6: Test Your Deployment

1. Open your frontend URL in a browser
2. Create a new account
3. Login with your credentials
4. Try sending messages
5. Test file uploads
6. Open another browser/incognito window and create another user
7. Test real-time messaging between users

## 🎉 Congratulations!

Your RTCA is now live! Share your frontend URL with others to start chatting.

## 🛠️ Troubleshooting

### Backend Issues

**Problem**: Backend won't start
- ✅ Check MongoDB connection string is correct
- ✅ Verify all environment variables are set
- ✅ Check Render logs for errors

**Problem**: Can't connect to database
- ✅ Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- ✅ Verify database user has read/write permissions

### Frontend Issues

**Problem**: Can't login or register
- ✅ Verify `VITE_API_URL` points to correct backend URL
- ✅ Check browser console for CORS errors
- ✅ Make sure `CLIENT_URL` in backend matches frontend URL

**Problem**: Messages not updating in real-time
- ✅ Verify `VITE_SOCKET_URL` is set correctly
- ✅ Check that backend is running
- ✅ Check browser console for WebSocket connection errors

## 📊 Free Tier Limitations

Render free tier has some limitations:
- Services spin down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds
- 750 hours/month of runtime

For production use, consider upgrading to a paid plan.

## 🔒 Security Best Practices

1. ✅ Use strong JWT_SECRET (at least 32 characters)
2. ✅ Never commit .env files to Git
3. ✅ Keep MongoDB credentials secure
4. ✅ Whitelist specific IPs in MongoDB if possible
5. ✅ Enable 2FA on your Render and GitHub accounts

## 📈 Next Steps

Consider adding:
- Custom domain name
- Email notifications
- Push notifications
- Analytics
- Error monitoring (Sentry)

---

## 🆘 Need Help?

If you encounter issues:
1. Check Render logs: Dashboard → Your Service → Logs
2. Check browser console (F12)
3. Verify all environment variables
4. Make sure MongoDB is accessible

---

**Deployed with ❤️ using Render.com**

1. Create a MongoDB Atlas account and database:
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string

2. Install Vercel CLI:
```bash
npm install -g vercel
```

### Deployment Steps

1. **Update Environment Variables**

For the backend, create environment variables in Vercel:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rtca-chat
JWT_SECRET=your_super_secure_secret_key_at_least_32_characters_long
NODE_ENV=production
```

2. **Update CORS Settings**

In `server/server.js`, update the CORS origin to your Vercel domain:
```javascript
const io = socketIo(server, {
  cors: {
    origin: 'https://your-app.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors({
  origin: 'https://your-app.vercel.app',
  credentials: true
}));
```

3. **Update Client Environment Variables**

Update `client/.env.production`:
```
VITE_API_URL=https://your-api.vercel.app/api
VITE_SOCKET_URL=https://your-api.vercel.app
```

4. **Deploy**

```bash
# From project root
vercel
```

Follow the prompts to deploy your application.

### Important Notes for Vercel Deployment

⚠️ **WebSocket Limitation**: Vercel's serverless functions have a 10-second timeout and don't support persistent WebSocket connections well. For production use with WebSockets, consider:

1. **Recommended Approach**: Deploy the backend separately
   - Deploy frontend to Vercel
   - Deploy backend to:
     - Railway.app (recommended)
     - Render.com
     - Heroku
     - DigitalOcean App Platform
     - AWS EC2/Elastic Beanstalk

2. **Alternative for Vercel**: Use Vercel for frontend only
   ```bash
   # Deploy only the frontend
   cd client
   vercel
   ```

   Then deploy the backend elsewhere and update the API URLs.

## Deploying Backend to Railway (Recommended)

Railway.app supports WebSockets and is perfect for this application:

1. Create account at https://railway.app
2. Create new project
3. Connect your GitHub repository
4. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET
   - PORT=5000
   - NODE_ENV=production
5. Set root directory to `server`
6. Deploy

## Deploying to Render.com

1. Create account at https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables
6. Deploy

## Post-Deployment Checklist

- [ ] MongoDB is accessible from your hosting platform
- [ ] Environment variables are set correctly
- [ ] CORS origins are updated
- [ ] Client environment variables point to correct API
- [ ] Test user registration
- [ ] Test login
- [ ] Test real-time messaging
- [ ] Test file uploads
- [ ] Test on mobile devices

## Security Recommendations for Production

1. **Change JWT Secret**: Use a strong, random secret key
2. **Use HTTPS**: Ensure your deployment uses SSL/TLS
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **File Upload Limits**: Already configured to 50MB
5. **Input Sanitization**: Already implemented
6. **MongoDB Security**: Use MongoDB Atlas with IP whitelist
7. **Environment Variables**: Never commit .env files

## Monitoring

Consider adding monitoring tools:
- Sentry for error tracking
- LogRocket for session replay
- MongoDB Atlas monitoring
- Vercel/Railway analytics

## Scaling Considerations

For high traffic:
1. Use Redis for Socket.IO adapter (horizontal scaling)
2. Implement message pagination
3. Add CDN for static assets
4. Use dedicated file storage (AWS S3, Cloudinary)
5. Implement database indexing
6. Add caching layer

## Support

If you encounter issues:
1. Check browser console for errors
2. Check server logs
3. Verify MongoDB connection
4. Check CORS settings
5. Verify environment variables
