import fs from 'fs'
let handler = async (m, { conn, usedPrefix }) => {
let teks = `┌  ◦ Mengakses Antilink ig/tt/fb/yt/gc dll
│  ◦ Mengakses Game Rpg
│  ◦ Mengakses Game Lainya
│  ◦ Enable & Disable
│  ◦ Auto Admin & UnAdmin
│  ◦ Play Audio & Video YouTube
│  ◦ Group Time
│  ◦ Kick All Member 
│  ◦ Mute & UnMute
│  ◦ Mengatur Text Welcome 
│  ◦ Support Hidetag, Totag, Tagall (dll)
│  ◦ Free Penambahan Premium 1 Minggu
│  ◦ Mengakses Fitur Premium (dll)
│  ◦ Akses Semua Fitur Tanpa batas limit
└  ◦ RP 10.000/Bulan

❏ *PRICE SEWA*
◦ 7 day : RP 3.000
◦ 15 day : RP 5.000
◦ 1 Month : RP 10.000
◦ 2 Month : RP 20.000
◦ Permanent : RP 25.000

❏ Minat? Silahkan Chat Nomor Owner
https://wa.me/${owner[0][0]}
`.trim()
await conn.sendFile(m.chat, fs.readFileSync('./media/thumbnail.jpg'), ' .thumbnailjpeg', teks, m, false)
}
handler.help = ['sewabot']
handler.tags = ['store']
handler.command = /^(sewabot|premium|sewa|prem)$/i

export default handler