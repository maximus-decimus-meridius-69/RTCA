require('dotenv').config();
const mongoose = require('mongoose');

const checkMessages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const messages = await db.collection('messages').find({}).toArray();

    console.log(`📨 Total messages: ${messages.length}\n`);

    if (messages.length > 0) {
      messages.forEach((msg, i) => {
        console.log(`Message ${i + 1}:`);
        console.log(`  From: ${msg.sender}`);
        console.log(`  To: ${msg.recipient}`);
        console.log(`  Type: ${msg.messageType}`);
        console.log(`  Encrypted: ${msg.encryptedContent?.substring(0, 50)}...`);
        console.log(`  Created: ${msg.createdAt}`);
        console.log('---');
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkMessages();
