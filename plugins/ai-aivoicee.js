import fetch from 'node-fetch';
import gtts from 'node-gtts';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

const defaultLang = 'id';
const gptApiUrl = 'https://api.sanzy.bar/api/ai?type=gpt&q=';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');

  // Jika panjang args[0] bukan 2 (tidak sesuai kode aslinya)
  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }

  // Jika tidak ada teks langsung dan jika ada pesan yang dibalas
  if (!text && m.quoted?.text) text = m.quoted.text;

  try {
    // Mengirim permintaan ke API GPT-3
    const gptResponse = await fetch(`${gptApiUrl}${encodeURIComponent(text)}`);
    const gptData = await gptResponse.json();

    // Mendapatkan teks hasil dari GPT-3
    let gptText = '';
    if (gptData.result && gptData.result.result) {
      gptText = gptData.result.result;
    } else {
      gptText = ''; // Jika tidak ada teks jawaban yang diberikan oleh API
    }

    // Periksa apakah teks tidak kosong sebelum mengonversinya menjadi suara
    if (gptText.trim() !== '') {
      // Mengubah teks menjadi file audio
      const audioFile = await tts(gptText, lang);

      // Mengirim file audio ke pengguna
      conn.sendFile(m.chat, audioFile, 'tts.opus', null, m, true);
    } else {
      m.reply('Teks yang diterima kosong.');
    }
  } catch (e) {
    m.reply(e + '');
  }
};

handler.help = ['ttsai <lang> <teks>'];
handler.tags = ['tools'];
handler.command = /^ttsai$/i;
handler.limit = true;

export default handler;

function tts(text, lang = 'id') {
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang);
      let filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date) + '.wav');
      tts.save(filePath, text, () => {
        resolve(readFileSync(filePath));
        unlinkSync(filePath);
      });
    } catch (e) {
      reject(e);
    }
  });
}