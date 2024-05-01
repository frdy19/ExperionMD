import { canLevelUp, xpRange } from '../lib/levelling.js';
import db from '../lib/database.js';

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender);
    let user = global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(user.level, global.multiplier);

    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let text = `
▢ Number : *${name}*
▢ Level : *${user.level}*
▢ XP : *${user.exp - min}/${xp}*
▢ Role : *${user.role}*

Hey there, ${name}! You're not ready to level up just yet. It seems like you need to munch up *${max - user.exp}* more XP to level up and reach new heights! Keep going, and the bots will be singing your praises soon! 🚀
`.trim();
        try {
            await conn.sendMessage(m.chat, {
                text: text,
                contextInfo: {
                    externalAdReply: {
                        title: `Hey there, ${name}! Congratulations! You Levelup🎉`,
                        thumbnailUrl: 'https://telegra.ph/file/d5542abbbe44a073d24ae.jpg',
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } catch (e) {
            m.reply(text);
        }
    } else {
        let beforeLevel = user.level * 1;
        while (canLevelUp(user.level, user.exp, global.multiplier)) {
            user.level++;
        }

        if (beforeLevel !== user.level) {
            let str = `
┌───⊷ *LEVEL*
▢ Number : *${name}*
▢ Level : *${user.level}*
▢ XP : *${user.exp - min}/${xp}*
▢ Role : *${user.role}*
└──────────────

Hey there, ${name}! Congratulations! You've leveled up! 🎉
`.trim();
            try {
                let img = 'https://telegra.ph/file/5aa52f969428833663c72.png'; // New image URL
                conn.sendFile(m.chat, img, 'levelup.jpg', str, m);
            } catch (e) {
                m.reply(str);
            }
        }
    }
}

handler.help = ['levelup'];
handler.tags = ['xp'];
handler.command = /^level(|up)$/i;

export default handler;
/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (t.me/VLShop2)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/