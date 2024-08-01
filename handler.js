const fs = require("fs");
const { ss } = require("chatbot/ss");

module.exports = {
  async input(conn, msg, sheet, data) {
    if (!sheet || !data) return;
    try {
      let res = await ss.addData(sheet + "!C2", data);
      conn.sendMessage(msg.key.remoteJid, {
        text: res.statusText + " data " + sheet + " berhasil di input",
      });
    } catch (err) {
      if (err) {
        conn.sendMessage(msg.key.remoteJid, { text: err.message });
      }
    }
  },
  async info(conn, msg, sheet, data) {
    if (!sheet) {
      conn.sendMessage(msg.key.remoteJid, {
        text: "info apa yang anda minta?",
      });
    } else {
      try {
        let arrObj = [];
        let resultArr = await ss.getRows(sheet);
        let headers = resultArr[0];
        resultArr.shift();
        resultArr.forEach((result, n) => {
          let dataObj = {};
          headers.forEach((key, idx) => {
            dataObj[key] = result[idx];
          });
          arrObj[n] = dataObj;
        });
        if (!data) {
          arrObj = arrObj.map(
            (el, n) =>
              `(${n + 1}) _____________\n${JSON.stringify(el)
                .replace(/,/gm, "\n")
                .replace("{", "")
                .replace("}", "")}\n\n`
          );
          arrObj = arrObj.join("");
          conn.sendMessage(msg.key.remoteJid, { text: arrObj });
        } else {
          for (let val of data) {
            arrObj = arrObj.filter((el) => Object.values(el).includes(val));
          }
          if (arrObj.length > 0) {
            arrObj = arrObj.map(
              (el, n) =>
                `(${n + 1}) _____________\n${JSON.stringify(el)
                  .replace(/,/gm, "\n")
                  .replace("{", "")
                  .replace("}", "")}\n\n`
            );
            arrObj = arrObj.join("");
            conn.sendMessage(msg.key.remoteJid, { text: arrObj });
          } else {
            conn.sendMessage(msg.key.remoteJid, {
              text: "tidak ada data yang ditemukan",
            });
          }
        }
      } catch (error) {
        conn.sendMessage(msg.key.remoteJid, { text: error.message });
      }
    }
  },

  // explain this function in the next section
  async panduan(conn, msg, ...tmp) {
    
    tmp = await tmp[2].map(
      (t) => "ketik :*" + t[0] + "* \n"
    );
    tmp = await tmp.join("\n");
    let pesan =
      "berikut ini adalah format pesan dan penjelasannya untuk menggunakan bot ini\n\n\n" +
      tmp;
    conn.sendMessage(msg.key.remoteJid, { text: pesan });
  },

};
