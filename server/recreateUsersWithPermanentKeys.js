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
    console.log('✅ Connected to MongoDB\n');

    // Delete old Alice and Bob
    await User.deleteMany({ email: { $in: ['alice@example.com', 'bob@example.com'] } });
    console.log('🗑️  Deleted old Alice and Bob\n');

    // Generate PERMANENT keys for Alice
    const aliceKeys = generateKeyPair();
    const alice = new User({
      username: 'alice',
      email: 'alice@example.com',
      password: 'password123',
      publicKey: aliceKeys.publicKey,
      privateKey: aliceKeys.privateKey,  // STORED IN DATABASE!
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      status: 'offline'
    });

    // Generate PERMANENT keys for Bob
    const bobKeys = generateKeyPair();
    const bob = new User({
      username: 'bob',
      email: 'bob@example.com',
      password: 'password123',
      publicKey: bobKeys.publicKey,
      privateKey: bobKeys.privateKey,  // STORED IN DATABASE!
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      status: 'offline'
    });

    await alice.save();
    await bob.save();

    console.log('✅ Created Alice and Bob with PERMANENT keys!\n');
    console.log('📝 Alice:');
    console.log(`   PublicKey:  ${aliceKeys.publicKey}`);
    console.log(`   PrivateKey: ${aliceKeys.privateKey}\n`);
    console.log('📝 Bob:');
    console.log(`   PublicKey:  ${bobKeys.publicKey}`);
    console.log(`   PrivateKey: ${bobKeys.privateKey}\n`);

    console.log('🔐 These keys are NOW stored in the database!');
    console.log('🔐 Every time you login, you get the SAME keys!');
    console.log('🔐 Encryption will ALWAYS work!\n');

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
