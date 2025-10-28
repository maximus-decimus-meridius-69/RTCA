# =Ë Deployment Checklist

Use this checklist to ensure smooth deployment to Render.com.

##  Pre-Deployment

- [ ] All code is tested locally
- [ ] MongoDB is running locally and working
- [ ] Messages send in real-time
- [ ] File uploads work
- [ ] No console errors in browser

##  MongoDB Atlas Setup

- [ ] Created MongoDB Atlas account
- [ ] Created a cluster (M0 free tier)
- [ ] Created database user with password
- [ ] Copied connection string
- [ ] Added `/rtca` to connection string
- [ ] Network access set to 0.0.0.0/0 (allow from anywhere)

##  GitHub Setup

- [ ] Created GitHub repository
- [ ] Initialized git in project folder (`git init`)
- [ ] Added all files (`git add .`)
- [ ] Created first commit (`git commit -m "Initial commit"`)
- [ ] Pushed to GitHub (`git push -u origin main`)

##  Render Backend Deployment

- [ ] Signed up for Render.com account
- [ ] Created new Web Service
- [ ] Connected GitHub repository
- [ ] Set Root Directory to `server`
- [ ] Set Build Command to `npm install`
- [ ] Set Start Command to `npm start`
- [ ] Added `NODE_ENV=production`
- [ ] Added `PORT=5000`
- [ ] Added `MONGODB_URI` (from MongoDB Atlas)
- [ ] Added `JWT_SECRET` (strong random string)
- [ ] Left `CLIENT_URL` empty for now
- [ ] Clicked "Create Web Service"
- [ ] Waited for deployment to complete
- [ ] Saved backend URL

##  Render Frontend Deployment

- [ ] Created new Static Site in Render
- [ ] Connected same GitHub repository
- [ ] Set Root Directory to `client`
- [ ] Set Build Command to `npm install && npm run build`
- [ ] Set Publish Directory to `dist`
- [ ] Added `VITE_API_URL` (backend URL + `/api`)
- [ ] Added `VITE_SOCKET_URL` (backend URL)
- [ ] Clicked "Create Static Site"
- [ ] Waited for deployment to complete
- [ ] Saved frontend URL

##  Final Configuration

- [ ] Updated backend `CLIENT_URL` with frontend URL
- [ ] Backend redeployed automatically
- [ ] Both services show "Live" status

##  Testing Deployed App

- [ ] Opened frontend URL in browser
- [ ] Created new account successfully
- [ ] Logged in successfully
- [ ] Opened incognito/another browser
- [ ] Created second account
- [ ] Sent message from user 1 to user 2
- [ ] Message appeared in real-time on user 2
- [ ] Sent message back from user 2 to user 1
- [ ] Message appeared in real-time on user 1
- [ ] Tested file upload (image)
- [ ] Image displayed correctly
- [ ] Tested typing indicator
- [ ] Tested read receipts (blue ticks)
- [ ] Tested on mobile device

##  Security Check

- [ ] JWT_SECRET is strong and random
- [ ] No `.env` files committed to GitHub
- [ ] MongoDB password is secure
- [ ] CORS is configured correctly

## <‰ Deployment Complete!

If all items are checked, your RTCA is successfully deployed!

## =Ý Important URLs

**Backend URL**: _______________________________________

**Frontend URL**: _______________________________________

**MongoDB Connection**: mongodb+srv://...

**GitHub Repo**: _______________________________________

---

## <˜ If Something Went Wrong

1. Check Render logs for errors
2. Verify all environment variables are correct
3. Make sure MongoDB Atlas is accessible
4. Check browser console (F12) for errors
5. Refer to [DEPLOYMENT.md](DEPLOYMENT.md) for detailed troubleshooting
