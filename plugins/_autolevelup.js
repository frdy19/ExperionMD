import { canLevelUp } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';
import moment from 'moment-timezone';

export async function before(m) {
    let user = global.db.data.users[m.sender];
    let chat = global.db.data.chats[m.chat];
    
    if (m.isGroup && chat.autolevelup && !chat.isBanned) {
        if (canLevelUp(user.level, user.exp, global.multiplier)) {
            let before = user.level;
            while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
            if (before !== user.level) {
                let teks = `🎉 ${user.role}`;
                let str = `
*🎉 C O N G R A T S 🎉*
*${before}* ➔ *${user.level}* [ *${user.role}* ]

*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_
`.trim();
                try {
                    let img = await levelup(teks, user.level);
                    await this.sendFile(m.chat, img, 'levelup.jpg', str, m);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }
    return true;
}