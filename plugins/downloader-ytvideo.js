
// SC BY © VYNAA CHAN
// RECOE WAJIB KASI CREDITS 
// WA: 6283896757978
// TOKO KEBUTUHAN BOT TERPERCAYA
// HANYA DI SINI
// https://linkbio.co/VLShop
// https://t.me/VynaaMD

import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, command, usedPrefix }) => {
    conn.room = conn.room ? conn.room: {}
    if (!args[0]) return m.reply(`Masukan Link Youtube!\n\nContoh :\n${usedPrefix + command} https://youtu.be/Wky7Gz_5CZs`)
    let id = 'youtubedl_' + m.sender
    if (id in conn.room) return m.reply('Kamu Masih Mendownload!')
    try {
        conn.room[id] = true
        let { video, title, thumbnail } = await youtubedl(args[0]).catch(async _=> await youtubedlv2(args[0]))
        let text = 'Youtube Video Downloader\n\n'
        text += `❏ Title: ${title}\n`
        text += `❏ Quality: ${video['360p'].quality}\n`
        text += `❏ File Size: ${video['360p'].fileSizeH}`
        let msg = await conn.sendFile(m.chat, thumbnail, null, text, m)
        conn.sendMessage(m.chat, { video: { url: await video['360p'].download() }, fileName: title + '.mp4', mimetype: 'video/mp4', caption: title }, { quoted: msg })
    } catch (e) {
        throw 'Failed :('
    } finally {
        delete conn.room[id]
    }
}
handler.help = ['ytmp4'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ytv2)$/i

handler.limit = true

export default handler