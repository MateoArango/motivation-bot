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
  cron.schedule('* * * * *', async () => {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID!) as TextChannel;
    
    if (!channel) {
      console.error("❌ Could not find the channel. Check your CHANNEL_ID.");
      return;
    }

    console.log('⏳ Fetching fresh motivation from ZenQuotes...');

    try {
      // Fetching from the public external API
      const response = await fetch('https://zenquotes.io/api/random');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as ZenQuote[];
      const { q, a } = data[0];

      // Sending the dynamically fetched quote
      await channel.send(`🌟 **Daily Boost:** "${q}" — *${a}*`);
      console.log('🚀 Motivation injected into Discord successfully.');

    } catch (error) {
      // QA Mindset: Graceful error handling so your bot doesn't crash on network failures
      console.error("❌ Failed to fetch or send the dynamic quote:", error);
    }
  });
});

client.login(process.env.DISCORD_TOKEN);