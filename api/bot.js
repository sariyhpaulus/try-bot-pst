const handler = require("../handler.js");
const helper = require("../helper.js");
const config = require("../config/config.json");
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const P = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const { termBot } = require("../lib/terminal.js");
require("dotenv").config();

module.exports = async (req, res) => {
  const argv = process.argv[2];

  async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(".baileys-md");
    const socket = makeWASocket({
      auth: state,
      printQRInTerminal: true,
      logger: P({ level: "info" }),
      browser: ["Baileys Multi Device", "safari", "1.0.0"]
    });

    socket.ev.on("creds.update", saveCreds);
    socket.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        const shouldReconnect = new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log("connection closed due to", lastDisconnect?.error, ", reconnecting ", shouldReconnect);
        if (shouldReconnect) {
          connectToWhatsApp();
        }
      } else if (connection === "open") {
        console.log("opened connection");
        await socket.updateProfileStatus(`Running...`);
        if (argv === "terminalbot") {
          termBot(socket);
        }
      }
    });

    socket.ev.on("messages.upsert", async ({ messages, type }) => {
      const msg = messages[0];
      if (!msg.message || msg.key.fromMe || msg.key.remoteJid === "status@broadcast") return;
      let templateMsgs = JSON.parse(fs.readFileSync("config/templateMsg.json")).templateMsg;
      const conversation = msg.message.conversation;
      if (!conversation) return;
      let tag = conversation.match(/#[\w-]*/g)?.[0]?.substring(1);
      let params = conversation.match(/(?<=:\s*)[\w\d\.@]+ *[\w\d\.]* *[\w\d\.]*/gm)?.map(param => param.trim());
      if (config.enable_spreadsheet) {
        const { ss } = require("../spreadsheet.js");
        let additionalMsgs = await ss.updateData("menu!c2:e");
        if (additionalMsgs.length > 0) {
          templateMsgs = [...templateMsgs, ...additionalMsgs];
        }
      }
      for (const templateMsg of templateMsgs) {
        if (conversation.includes(templateMsg.query.match(/#[\w-]*/g)[0])) {
          await handler.handle(socket, msg, templateMsg, tag, params);
        }
      }
      console.log("handled message");
    });
  }

  await connectToWhatsApp();
  res.status(200).send('Bot is running');
};
