// import req. modules
const mongoose = require('mongoose');
const User = require('../models/user');
const Thought = require('../models/thought');

// function to seed user and thoughts
async function seedUsers() {
  try {
    const userData = [
      { username: 'test1', email: 'test1@gmail.com' },
      { username: 'test2', email: 'test2@gmail.com' },
      { username: 'test3', email: 'test3@gmail.com' },
    ];

    const savedUsers = await User.create(userData);
    console.log(`${savedUsers.length} users created`);

    for (const user of savedUsers) {
      const thoughtCount = 5;
      const thoughts = [];

      for (let i = 0; i < thoughtCount; i++) {
        const thoughtText = `Thought ${i + 1} for ${user.username}`;
        const username = user.username;
        const thought = new Thought({
          thoughtText,
          username,
        });

        thoughts.push(thought);
      }

      await Thought.create(thoughts);
      console.log(`${thoughts.length} thoughts created for ${user.username}`);

      user.thoughts = thoughts.map((thought) => thought._id);
      await user.save();
    }
  } catch (err) {
    console.error('Error seeding', err);
  }
}

// connect to database, seed data, and disconnect
async function Seed() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/socialnetAPI', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected');

    await User.createIndexes();
    await seedUsers();
  } catch (err) {
    console.error('Error connecting', err);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected');
  }
}

// seed function to init the seeding process
Seed();

