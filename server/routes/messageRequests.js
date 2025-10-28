const express = require('express');
const MessageRequest = require('../models/MessageRequest');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Send message request
router.post('/send/:recipientId', auth, async (req, res) => {
  try {
    const { recipientId } = req.params;
    const { message } = req.body;

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if recipient is private
    if (!recipient.isPrivate) {
      return res.status(400).json({ error: 'User is not private, no request needed' });
    }

    // Check if request already exists
    const existingRequest = await MessageRequest.findOne({
      sender: req.user._id,
      recipient: recipientId,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ error: 'Request already sent' });
    }

    // Create request
    const messageRequest = new MessageRequest({
      sender: req.user._id,
      recipient: recipientId,
      message: message || '',
      status: 'pending'
    });

    await messageRequest.save();
    await messageRequest.populate('sender', 'username displayName avatar');
    await messageRequest.populate('recipient', 'username displayName avatar');

    res.status(201).json({ request: messageRequest });
  } catch (error) {
    console.error('Send message request error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get pending requests (received)
router.get('/pending', auth, async (req, res) => {
  try {
    const requests = await MessageRequest.find({
      recipient: req.user._id,
      status: 'pending'
    })
      .populate('sender', 'username displayName avatar status')
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    console.error('Get pending requests error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get sent requests
router.get('/sent', auth, async (req, res) => {
  try {
    const requests = await MessageRequest.find({
      sender: req.user._id
    })
      .populate('recipient', 'username displayName avatar status')
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    console.error('Get sent requests error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Accept request
router.post('/accept/:requestId', auth, async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await MessageRequest.findOne({
      _id: requestId,
      recipient: req.user._id,
      status: 'pending'
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = 'accepted';
    await request.save();

    res.json({ message: 'Request accepted', request });
  } catch (error) {
    console.error('Accept request error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reject request
router.post('/reject/:requestId', auth, async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await MessageRequest.findOne({
      _id: requestId,
      recipient: req.user._id,
      status: 'pending'
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = 'rejected';
    await request.save();

    res.json({ message: 'Request rejected', request });
  } catch (error) {
    console.error('Reject request error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
