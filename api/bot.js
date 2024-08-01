const handler = require("../handler.js");
const helper = require("../chatbot/helper");
const config = require("../config/config.json");
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const P = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const { termBot } = require("../lib/terminal.js");
require("dotenv").config();

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('./sessions');
  const socket = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: 'silent' }),
    browser: ['YourBot', 'safari', '3.0']
  });

  socket.ev.on('creds.update', saveCreds);
  socket.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = (new Boom(lastDisconnect.error)).output.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === 'open') {
      console.log('Bot is running');
    }
  });

  socket.ev.on('messages.upsert', async ({ messages, type }) => {
    const msg = messages[0];
    if (!msg.key.fromMe && msg.key.remoteJid !== 'status@broadcast') {
      let templateMsg = JSON.parse(fs.readFileSync('config/templateMsg.json')).messages;
      const text = msg.message.conversation;
      if (text === 'panduan') {
        handler.panduan(socket, msg);
      } else if (config.useSpreadsheet) {
        const { ss } = require('../chatbot/ss');
        let rows = await ss.getRows('menu!c2:e');
        templateMsg = [...templateMsg, ...rows];
        // Implement your message handling logic here
      }
    }
  });
}

module.exports = async (req, res) => {
  await connectToWhatsApp();
  res.status(200).send('Bot is running');
};
