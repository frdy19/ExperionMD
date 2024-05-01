import fs from "fs";
import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
  let text = `Vynaa is online, Sir.`;

  // Unduh gambar thumbnail
  let response = await fetch("https://telegra.ph/file/a290673bdf46d695000bc.jpg");
  let thumbnailBuffer = await response.buffer();

  conn.sendFile(
    m.chat,
    "./vn/ntahlah.mp3",
    "ntahlah.mp3",
    text,
    m,
    true,
    {
      type: "audioMessage",
      ptt: true,
      mimetype: 'audio/mp4',
      fileName: "yuhumina.mp3",
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: "url_audio",
          title: "T O T A L - F I T U R",
          body: `📁 ${totalf} aktif`,
          sourceUrl: "url_audio",
          thumbnail: thumbnailBuffer // Menggunakan buffer gambar thumbnail
        }
      }
    }
  );
};

handler.help = ['totalfitur'];
handler.tags = ['info'];
handler.command = ['totalfitur'];

export default handler;
/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (t.me/VLShop2)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/