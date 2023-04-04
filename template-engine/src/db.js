const { MongoClient } = require('mongodb');
require('dotenv').config()

const uri = "mongodb+srv://sudheer:vasanthi1@cluster0.3v45a.mongodb.net/user-authentication?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

module.exports = { connect };
