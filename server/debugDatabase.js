require('dotenv').config();
const mongoose = require('mongoose');

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to:', process.env.MONGODB_URI);

    const db = mongoose.connection.db;

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📁 Collections in database:');
    collections.forEach(coll => {
      console.log(`  - ${coll.name}`);
    });

    // Check users collection
    if (collections.find(c => c.name === 'users')) {
      const usersCount = await db.collection('users').countDocuments();
      console.log(`\n👥 Total documents in 'users' collection: ${usersCount}`);

      const users = await db.collection('users').find({}).toArray();
      console.log('\n📝 Users:');
      users.forEach(user => {
        console.log(`  - ${user.username} (${user.email})`);
        console.log(`    PublicKey: ${user.publicKey?.substring(0, 40)}...`);
      });
    } else {
      console.log('\n❌ No "users" collection found!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkDatabase();
