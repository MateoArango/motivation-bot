import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// Defining the shape of the API response data
interface ZenQuote {
  q: string; // The quote text
  a: string; // The author name
}

client.once('clientReady', (c) => {
  console.log(`✅ Success! ${c.user.tag} is now monitoring the motivation levels.`);

  // Scheduled to run every minute for testing
  cron.schedule('0 8 * * *', async () => {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID!) as TextChannel;
    
    if (!channel) {
      console.error("❌ Could not find the channel. Check your CHANNEL_ID.");
      return;
    }

    console.log('⏳ Fetching fresh motivation from ZenQuotes...');

    try {
      // Fetching from the public external API
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json() as ZenQuote[];
// QA Check: Make sure data[0] actually exists before destructuring
      const firstQuote = data[0];
      if (!firstQuote) {
        throw new Error('API returned an empty dataset');
      }
      const { q, a } = firstQuote;
      await channel.send(`🌟 **Daily Boost:** "${q}" — *${a}*`);
      console.log('🚀 API Motivation delivered.');
    } catch (error) {
      // QA Mindset: Graceful error handling so your bot doesn't crash on network failures
      console.error("❌ Failed to fetch or send the dynamic quote:", error);
    }
  });
});

client.login(process.env.DISCORD_TOKEN);



// Keep-alive server to prevent unservice on platforms like Render
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

// Expose a health check endpoint
app.get('/', (req, res) => {
  res.send('🤖 Bot is awake and running smoothly!');
});

// Start the web server
app.listen(PORT, () => {
  console.log(`🌐 Keep-alive server listening on port ${PORT}`);
});