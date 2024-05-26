const { Client } = require('pg');
const { config } = require('dotenv');

config();
const connectionString = process.env.DATABASE_URL;
const client = new Client({ connectionString });
client.connect();

client.on('notification', async (msg) => {
  const payload = JSON.parse(msg.payload);
  // Handle the notification (e.g., trigger an action in your application)
  console.log(payload);
});

client.query('LISTEN request_changes');



export const sendNotification = async (username: string, message: string) => {