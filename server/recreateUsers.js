require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const CryptoJS = require('crypto-js');

const generateKeyPair = () => {
  const privateKey = CryptoJS.lib.WordArray.random(32).toString();
  const publicKey = CryptoJS.SHA256(privateKey).toString();
  return { privateKey, publicKey };
};

const recreateUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete Alice and Bob
    await User.deleteMany({ email: { $in: ['alice@example.com', 'bob@example.com'] } });
    console.log('🗑️  Deleted old Alice and Bob');

    // Create new Alice and Bob with fresh keys
    const alice = new User({
      username: 'alice',
      email: 'alice@example.com',
      password: 'password123',
      publicKey: generateKeyPair().publicKey,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      status: 'offline'
    });

    const bob = new User({
      username: 'bob',
      email: 'bob@example.com',
      password: 'password123',
      publicKey: generateKeyPair().publicKey,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      status: 'offline'
    });

    await alice.save();
    await bob.save();

    console.log('✅ Created fresh Alice and Bob users');
    console.log('\n📝 Important: These publicKeys will be REPLACED when you login!');
    console.log('   The login flow will sync your localStorage keys to the database.\n');

    console.log('📋 Login Credentials:');
    console.log('────────────────────────────────');
    console.log('Alice: alice@example.com / password123');
    console.log('Bob:   bob@example.com / password123');
    console.log('────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

recreateUsers();
