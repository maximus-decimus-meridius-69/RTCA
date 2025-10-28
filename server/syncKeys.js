require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Message = require('./models/Message');

const syncKeys = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear all messages first
    await Message.deleteMany({});
    console.log('✅ Cleared all messages');

    // List all users
    const users = await User.find({}).select('username email publicKey');
    console.log('\n📋 Current Users:');
    users.forEach(user => {
      console.log(`  - ${user.username} (${user.email})`);
      console.log(`    PublicKey: ${user.publicKey?.substring(0, 20)}...`);
    });

    console.log('\n⚠️  IMPORTANT INSTRUCTIONS:');
    console.log('════════════════════════════════════════════════════════════');
    console.log('1. Open browser DevTools (F12)');
    console.log('2. Go to Application → Local Storage → http://localhost:5173');
    console.log('3. DELETE "privateKey" and "publicKey" entries');
    console.log('4. Refresh the page (F5)');
    console.log('5. New keys will be generated automatically');
    console.log('6. Do this for BOTH Alice and Bob browsers');
    console.log('════════════════════════════════════════════════════════════\n');

    console.log('After clearing localStorage, the app will:');
    console.log('  ✓ Generate new encryption key pairs');
    console.log('  ✓ Update the publicKey in database on next login');
    console.log('  ✓ Messages will encrypt/decrypt correctly\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

syncKeys();
