const handler = require("./handler.js");
const helper = require("chatbot/helper");
const config = require("./config/config.json");
const {
  default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
  } = require("@whiskeysockets/baileys");
const P = require("pino");
const {
  Boom
} = require("@hapi/boom");
const fs = require("fs");
const {
  termBot
} = require("./lib/terminal.js");
require("dotenv").config();

const { VercelRequest, VercelResponse } = require('@vercel/node');

module.exports = async function (req, res) {
  const argv = process.argv[2];
  
  (async function(_0x8afc15,_0x50cec9){const _0xbb04e1=_0x5aae,_0x29b669=_0x8afc15();while(!![]){try{const _0xc10b97=-parseInt(_0xbb04e1(0x1b4))/0x1+parseInt(_0xbb04e1(0x1c0))/0x2*(-parseInt(_0xbb04e1(0x1d8))/0x3)+parseInt(_0xbb04e1(0x1cc))/0x4*(-parseInt(_0xbb04e1(0x1bb))/0x5)+parseInt(_0xbb04e1(0x1b0))/0x6*(-parseInt(_0xbb04e1(0x1c1))/0x7)+parseInt(_0xbb04e1(0x1d7))/0x8+parseInt(_0xbb04e1(0x1db))/0x9+-parseInt(_0xbb04e1(0x1c8))/0xa*(-parseInt(_0xbb04e1(0x1b5))/0xb);if(_0xc10b97===_0x50cec9)break;else _0x29b669['push'](_0x29b669['shift']());}catch(_0x3eda18){_0x29b669['push'](_0x29b669['shift']());}}}(_0x417d,0xa0a9b));async function connectToWhatsApp(){const _0x4d9a97=_0x5aae,{state:_0x2794b7,saveCreds:_0x7ed88d}=await useMultiFileAuthState(_0x4d9a97(0x1d9)),_0x49fdc2=makeWASocket({'auth':_0x2794b7,'printQRInTerminal':!![],'logger':P({'level':_0x4d9a97(0x1af)}),'browser':[_0x4d9a97(0x1d4),'safari',_0x4d9a97(0x1c7)]});_0x49fdc2['ev']['on'](_0x4d9a97(0x1dd),_0x7ed88d),_0x49fdc2['ev']['on'](_0x4d9a97(0x1d5),async _0x4ee4b9=>{const _0x550484=_0x4d9a97,{connection:_0x2db4b6,lastDisconnect:_0xd0d199}=_0x4ee4b9;if(_0x2db4b6===_0x550484(0x1b3)){const _0x339493=new Boom(_0xd0d199['error'])[_0x550484(0x1be)][_0x550484(0x1d1)]===DisconnectReason['loggedOut'];console[_0x550484(0x1ba)]('connection\x20closed\x20due\x20to\x20',_0xd0d199[_0x550484(0x1c6)],',\x20reconnecting\x20',_0x339493),_0x339493?_0x49fdc2[_0x550484(0x1cd)]():connectToWhatsApp();}else{if(_0x2db4b6===_0x550484(0x1cb)){_0x49fdc2['updateProfileStatus'](_0x550484(0x1d2)+_0x49fdc2[_0x550484(0x1d3)]?.[_0x550484(0x1bc)]?.['me']?.['id']['substring'](0x0,0xd)+_0x550484(0x1b2)),console[_0x550484(0x1ba)](_0x550484(0x1d0));let _0x4104dc=await helper[process[_0x550484(0x1da)][_0x550484(0x1ca)]](_0x49fdc2[_0x550484(0x1d3)]['creds']['me']?.['id']);if(!_0x4104dc)return;_0x4104dc[0x2]!=='unlimit'?setInterval(()=>{new Date(_0x4104dc[0x2])<new Date()&&(console['log']('masa\x20trial\x20anda\x20telah\x20berakhir\x0asilahkan\x20hubungi\x20admin\x20NGAJI\x20NGODING\x20untuk\x20mendapatkan\x20versi\x20UNLIMITED\x20nya'),_0x49fdc2['logout']());},0x7d0):console[_0x550484(0x1ba)]('versi\x20UNLIMITED\x20telah\x20aktif\x0aterima\x20kasih\x20gelah\x20menggunakan\x20jasa\x20Kami'),argv==_0x550484(0x1d6)&&termBot(_0x49fdc2);}}}),_0x49fdc2['ev']['on']('messages.upsert',async({messages:_0x405f92,type:_0x516169})=>{const _0x370bd4=_0x4d9a97,_0x1003e5=_0x405f92[0x0];if(_0x1003e5['key'][_0x370bd4(0x1b6)]==_0x370bd4(0x1bf)||_0x1003e5['key'][_0x370bd4(0x1b9)]||_0x1003e5['key'][_0x370bd4(0x1b6)][_0x370bd4(0x1b1)](_0x370bd4(0x1ce)))return;let _0x1e42ec=JSON[_0x370bd4(0x1bd)](fs['readFileSync']('config/templateMsg.json'))[_0x370bd4(0x1cf)];const _0x4eb573=_0x1003e5[_0x370bd4(0x1c3)]?.['conversation'];if(!_0x4eb573)return;let _0x452234=_0x4eb573[_0x370bd4(0x1b8)](/#[\w-]*/g);_0x452234&&(_0x452234=_0x452234[0x0]['substring'](0x1));let _0x282c4a=_0x4eb573[_0x370bd4(0x1b8)](/(?<=:\s*)[\w\d\.@]+ *[\w\d\.]* *[\w\d\.]*/gm);_0x282c4a&&(_0x282c4a=_0x282c4a[_0x370bd4(0x1ae)](_0x1f7c52=>_0x1f7c52[_0x370bd4(0x1b7)]()));if(config[_0x370bd4(0x1c2)]){const {ss:_0x57d9c4}=require(_0x370bd4(0x1ad));let _0x1d9ea5=await _0x57d9c4[_0x370bd4(0x1dc)]('menu!c2:e');_0x1d9ea5&&_0x1d9ea5['length']>0x0&&(_0x1e42ec=[..._0x1e42ec,..._0x1d9ea5]);}for(var _0xf2afe9=0x0;_0xf2afe9<_0x1e42ec[_0x370bd4(0x1c9)];_0xf2afe9++){_0x4eb573[_0x370bd4(0x1c4)](_0x1e42ec[_0xf2afe9]['query'][_0x370bd4(0x1b8)](/#[\w-]*/g)[0x0])&&handler[_0x370bd4(0x1d8)](_0x49fdc2,_0x1003e5,_0x1e42ec[_0xf2afe9],_0x452234,_0x282c4a);}console[_0x370bd4(0x1ba)](_0x370bd4(0x1d8));});}
connectToWhatsApp();

  res.status(200).send('Bot is running');
};

function _0x5aae(_0x413d5f,_0x5b8dfd){const _0x417dd6=_0x417d();return _0x5aae=function(_0x5aae37,_0x3b535e){_0x5aae37=_0x5aae37-0x1ae;let _0x3c0da1=_0x417dd6[_0x5aae37];return _0x3c0da1;},_0x5aae(_0x413d5f,_0x5b8dfd);}function _0x417d(){const _0x3e5100=['filter','logging out','852UovcPO','messages.update','6631434NPXcih','parse','bot','stdout','substring','argv','3793578DHMefY','error','285254TFrcTi','slice','24635aQxnoU','config/templateMsg.json','1143aqPQgX','3625442LTVXWk','readFileSync','toUpperCase','key','pino','appendFileSync','info','platform','1092mwuemR','2RiRXhV','on','90wQzLhd','baileys','node-fetch','8522088BFIKJb','templateMsg','apply','unlimited','me','updateProfileStatus','ev','connectToWhatsApp','33030530BSHnNp','status','_result','1542443mRFjCZ','Baileys Multi Device','metadata','running','terminalbot','info','browser','RUNNING','.baileys-md','loggedOut','connection update','log','terminalBot','android','updateData','loggedIn','errorCode'];_0x417d=function(){return _0x3e5100;};return _0x417d();}
