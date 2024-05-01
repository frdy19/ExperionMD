import fs from 'fs';

let handler = async (m, { conn }) => {
    let pfft = `
> ʜᴇʟʟᴏ, ɪ ᴀᴍ ᴀ *ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ* ᴡʜᴏ ᴄᴀɴ ꜰᴜʟꜰɪʟʟ ʏᴏᴜʀ ᴅɪɢɪᴛᴀʟ ɴᴇᴇᴅꜱ. ᴀʀᴇ ʏᴏᴜ ꜰᴇᴇʟɪɴɢ ᴛɪʀᴇᴅ? ɪ ᴀᴍ ᴀʟᴡᴀʏꜱ ʜᴇʀᴇ ꜰᴏʀ ʏᴏᴜ ᴛᴏ ᴍᴀᴋᴇ ʏᴏᴜʀ ᴅᴀʏ ᴇᴀꜱɪᴇʀ.

> ᴅᴏɴ'ᴛ ꜰᴏʀɢᴇᴛ ᴛᴏ ʀᴇɢɪꜱᴛᴇʀ ʏᴏᴜʀꜱᴇʟꜰ ɪɴ ᴛʜᴇ ᴠʏɴᴀᴀ *ᴅᴀᴛᴀʙᴀꜱᴇ* ꜱᴏ ᴛʜᴀᴛ ᴠʏɴᴀᴀ ᴄᴀɴ ʀᴇᴍᴇᴍʙᴇʀ ʏᴏᴜ ᴀꜱ ʟᴏɴɢ ᴀꜱ ᴠʏɴᴀᴀ ʀᴇᴍᴀɪɴꜱ ᴀᴄᴛɪᴠᴇ.

> • sᴛᴀᴛᴜs : ᴘᴜʙʟɪᴄ
> • ʟᴀɴɢᴜᴀɢᴇ : ɴᴏᴅᴇᴊs
> • ʙᴀɪʟᴇʏ : @ᴀᴅɪᴡᴀsʜɪɴɢ
> • ʙᴀɪʟᴇʏ sᴜᴘᴘ : @ᴡʜɪsᴋᴇʏ

ᴋᴇᴛɪᴋ *.ᴀʟʟᴍᴇɴᴜ*
ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ꜱᴇᴍᴜᴀ ꜰɪᴛᴜʀ
ᴋᴇᴛɪᴋ *.ᴍᴇɴᴜʟɪꜱᴛ*
ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ꜱᴇᴍᴜᴀ ʟɪꜱᴛ ᴍᴇɴᴜ
`;
    let loadd = [
        '《██▒▒▒▒▒▒▒▒▒▒▒》10%',
        '《████▒▒▒▒▒▒▒▒▒》30%',
        '《███████▒▒▒▒▒▒》50%',
        '《██████████▒▒▒》70%',
        '《█████████████》100%',
        '𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...'
    ];

    let { key } = await conn.sendMessage(m.chat, { text: '_Loading_' }); //Pengalih isu

    for (let i = 0; i < loadd.length; i++) {
        await conn.sendMessage(m.chat, { text: loadd[i], edit: key });
    }

    let ihu = 'https://telegra.ph/file/663f0f0a19d3bb0f3c246.jpg';
    await conn.sendMessage(m.chat, {
        image: { url: "https://telegra.ph/file/f2b5b0edc3a4d7da32801.jpg" },
        gifPlayback: true,
        caption: pfft,
        contextInfo: {
            externalAdReply: {
                title: global.namebot,
                body: global.author,
                thumbnailUrl: global.vynaajpg,
                sourceUrl: link.web,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }); 

    await conn.sendMessage(m.chat, { audio: { url: './vn/ehe.mp3' }, viewOnce: true, seconds: fsizedoc, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [100,0,100,0,100,0,100] }, { quoted: m });
};

handler.command = /^(menu|help|ler)$/i;

export default handler;