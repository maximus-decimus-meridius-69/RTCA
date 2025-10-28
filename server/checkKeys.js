const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/rtca')
  .then(async () => {
    console.log('Connected to MongoDB');

    const users = await User.find(
      { username: { $in: ['alice', 'bob'] } },
      'username email publicKey'
    );

    console.log('\n=== Database User Keys ===\n');
    users.forEach(user => {
      console.log(`User: ${user.username} (${user.email})`);
      console.log(`PublicKey: ${user.publicKey?.substring(0, 50)}...`);
      console.log(`Full PublicKey: ${user.publicKey}`);
      console.log('---');
    });

    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
