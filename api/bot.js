console.log("Bot API Endpoint Called");

module.exports = (req, res) => {
  console.log("Request Received:", req.body);
  
  // Log more details if needed
  console.log("Headers:", req.headers);
  
  // Your existing bot logic
  const handler = require("../handler.js");
  const helper = require("../helper");
  const config = require("../config/config.json");
  const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
  } = require("@whiskeysockets/baileys");
  const P = require("pino");
  const { Boom } = require("@hapi/boom");
  const fs = require("fs");
  const { termBot } = require("../lib/terminal.js");
  require("dotenv").config();
  
  const argv = process.argv[2];

  (async function connectToWhatsApp() {
    try {
      const { state, saveCreds } = await useMultiFileAuthState('sessions');
      console.log("State and SaveCreds obtained");
      
      const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: P({ level: 'silent' }),
        browser: ['Bot', 'safari', '3.0']
      });
      
      console.log("Socket initialized");
      
      sock.ev.on('creds.update', saveCreds);
      sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        console.log("Connection update:", update);
        
        if (connection === 'close') {
          const shouldReconnect = (new Boom(lastDisconnect?.error))?.output?.statusCode !== DisconnectReason.loggedOut;
          console.log('Connection closed due to', lastDisconnect.error, ', reconnecting', shouldReconnect);
          if (shouldReconnect) {
            connectToWhatsApp();
          }
        } else if (connection === 'open') {
          console.log('Bot siap');
        }
      });

      sock.ev.on('messages.upsert', async ({ messages, type }) => {
        const msg = messages[0];
        if (msg.key.fromMe || msg.key.remoteJid === 'status@broadcast') return;
        let command = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        console.log('Received message:', command);
        // Your existing message handling logic
      });

      res.status(200).json({ message: "Bot API is running" });

    } catch (error) {
      console.error("Error connecting to WhatsApp:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  })();
};
