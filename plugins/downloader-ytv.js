import fs from 'fs';
import ytdl from 'ytdl-core';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn["youtube_mp4"] = conn["youtube_mp4"] ? conn["youtube_mp4"] : {};
    if (m.sender in conn["youtube_mp4"]) {
        return;
    }

    if (!args[0]) {
        return m.reply(
            `contoh: *${
                usedPrefix + command
            }* https://www.youtube.com/watch?v=K9_VFxzCuQ0`
        );
    }
    const isValid = await ytdl.validateURL(args[0]);
    if (!isValid) {
        return m.reply("*link yang anda masukkan tidak didukung.*");
    }
    conn.sendMessage(m.chat, {
        react: {
            text: '🎟',
            key: m.key,
        }
    });

    const _filename = `./tmp/${Math.random().toString(36).substring(2, 7)}.mp4`;
    const writer = fs.createWriteStream(_filename);

    conn["youtube_mp4"][m.sender] = true;
    try {
        const { videoDetails } = await ytdl.getInfo(args[0]);
        const { title, publishDate, author, isFamilySafe } =
            videoDetails;
        const { user } = author;
        return new Promise(async (resolve, reject) => {
            ytdl(args[0], {
                quality: "lowest",
            }).pipe(writer);
            writer.on("error", () => {
                m.reply("Gagal mengirim video");
                delete conn["youtube_mp4"][m.sender];
                resolve();
            });
            writer.on("close", async () => {
                try {
                    await conn.sendMessage(
                        m.chat,
                        {
                            video: {
                                url: _filename,
                            },
                            caption: `┌  • *Y o u t u b e - M P 4*\n│  ◦ *Judul:* ${title}\n│  ◦ *Dipublikasikan:* ${publishDate}\n└  ◦ *Pengarang:* ${user}`,
                        },
                        { quoted: m }
                    );
                } catch {
                    m.reply("Gagal mengirim video");
                }
                fs.unlinkSync(_filename);
                delete conn["youtube_mp4"][m.sender];
                resolve();
            });
        });
    } catch {
        m.reply("*Gagal mendapatkan video :(*");
    }
};


handler.help = ['ytmp4 ⧼url⧽']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'ytv']

export default handler
// SC BY © VYNAA CHAN
// RECODE WAJIB KASI CREDITS 
// WA: 6282389924037
// TOKO KEBUTUHAN BOT TERPERCAYA
// HANYA DI SINI
// https://linkbio.co/VLShop
// https://t.me/VynaaMD