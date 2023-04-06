require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.TOKEN, { polling: true });
bot.onText(/\/palabra (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const palabra = match[1];
  
  // Responde con un mensaje que contiene la palabra ingresada
  bot.sendMessage(chatId, `Has ingresado la palabra: ${palabra}`);
});

module.exports = bot;