import fetch from "node-fetch";

export async function before(m) {
    this.autosholat = this.autosholat || {};
    const who = m.mentionedJid && m.mentionedJid[0] || (m.fromMe ? this.user.jid : m.sender);
    const id = m.chat;
    
    if (id in this.autosholat) {
        return false;
    }

    const jadwalSholat = {
        Dhuhr: "12:10",
        Asr: "15:10",
        Maghrib: "18:20",
        Isha: "19:30",
        Subuh: "05:30",
    };

    const date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNow === waktu) {
            const command = sholat.toLowerCase();
            const caption = `Now playing ${sholat} prayer reminder audio.`;
            const audio = `https://l.top4top.io/m_2993721ug9.mp3`;
            const thumbnailURL = 'https://telegra.ph/file/19e7731fe5e18107890d4.jpg';
            
            await this.sendFile(m.chat, audio, 'error.mp3', caption, m, true, {
                type: 'audioMessage',
                ptt: true,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaUrl: 'https://instagram.com/vynaa_valerie',
                        mediaType: 2,
                        description: 'https://instagram.com/vynaa_valerie',
                        title: `Waktu Sholat ${sholat} Telah Tiba`,
                        body: 'ambilah air wudhu dan segeralah shalat',
                        thumbnailUrl: thumbnailURL
                    }
                }
            });

            this.autosholat[id] = [
                setTimeout(() => {
                    delete this.autosholat[id];
                }, 57000)
            ];
        }
    }
}

export const disabled = false;