require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');

// Generate encryption keys (same logic as frontend)
const generateKeyPair = () => {
  const privateKey = CryptoJS.lib.WordArray.random(32).toString();
  const publicKey = CryptoJS.SHA256(privateKey).toString();
  return { privateKey, publicKey };
};

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing users (optional - comment out if you want to keep existing users)
    // await User.deleteMany({});
    // console.log('Cleared existing users');

    // User 1 - Alice
    const alice = {
      username: 'alice',
      email: 'alice@example.com',
      password: 'password123',
      publicKey: generateKeyPair().publicKey,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      status: 'offline'
    };

    // User 2 - Bob
    const bob = {
      username: 'bob',
      email: 'bob@example.com',
      password: 'password123',
      publicKey: generateKeyPair().publicKey,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      status: 'offline'
    };

    // Check if users already exist
    const existingAlice = await User.findOne({ email: alice.email });
    const existingBob = await User.findOne({ email: bob.email });

    if (existingAlice) {
      console.log('❌ User "alice" already exists');
    } else {
      const aliceUser = new User(alice);
      await aliceUser.save();
      console.log('✅ Created user: alice (alice@example.com)');
    }

    if (existingBob) {
      console.log('❌ User "bob" already exists');
    } else {
      const bobUser = new User(bob);
      await bobUser.save();
      console.log('✅ Created user: bob (bob@example.com)');
    }

    console.log('\n📋 Login Credentials:');
    console.log('────────────────────────────────');
    console.log('User 1:');
    console.log('  Email: alice@example.com');
    console.log('  Password: password123');
    console.log('');
    console.log('User 2:');
    console.log('  Email: bob@example.com');
    console.log('  Password: password123');
    console.log('────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
