require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('./models/Message');

const clearMessages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    const result = await Message.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} messages from database`);
    console.log('📝 All old messages have been cleared.');
    console.log('🔄 New messages will use the fixed encryption logic.');

    process.exit(0);
  } catch (error) {
    console.error('Error clearing messages:', error);
    process.exit(1);
  }
};

clearMessages();
