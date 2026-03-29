const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const SERVER_URL = process.env.SERVER_URL; // public URL Railway

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => console.log("Bot ready 😏"));

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== CHANNEL_ID) return;

  // kalau ketik /r replyText
  if (message.content.startsWith("/r ")) {
    const replyText = message.content.slice(3).trim();
    if (!replyText) return;

    console.log("Sending admin reply to Railway:", replyText);

    try {
      await axios.post(`${SERVER_URL}/admin-reply`, { message: replyText });
      console.log("POST success");
      message.reply("Sent 😏");
    } catch (err) {
      console.error("POST failed:", err.response?.data || err.message);
      message.reply("Error 😭");
    }
  }
});

client.login(TOKEN);