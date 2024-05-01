import fetch from 'node-fetch'
let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`Contoh:\n${usedPrefix}lk21 avatar`)
    if (text.startsWith('https://lk21-api.cyclic.app')) {
        let data = await(await fetch(text)).json()
        let caption = `
❃ *Title:* ${data.title}
❃ *Release:* ${data.releaseDate}
❃ *Duration:* ${data.duration}
❃ *Rating:* ${data.rating}
❃ *Quality:* ${data.quality}
❃ *Directors:* ${data.directors}
❃ *Casts:* ${data.casts}
❃ *Country:* ${data.countries}

❃ *Synopsis:* ${data.synopsis}
`.trim()
	await conn.sendFile(m.chat, "", data.posterImg, caption, m);
} else {
    let data = await(await fetch('https://lk21-api.cyclic.app/search/' + text)).json()
    let caption = data.map(v => {
        return `
乂 *Title:* ${v.title}
❃ *Genres:* ${v.genres}
❃ *Type:* ${v.type}

➠ *Link:* https://lk21-api.cyclic.app/${v.type == 'movie' ? 'movies' : v.type}/${v['_id']}
`.trim()}).join('\n\n\n')
    await conn.sendFile(m.chat, 'https://telegra.ph/file/a27c2ac18fe5fff447a53.jpg', 'lk21.jpg', caption, m)
    }
}
handler.help = ['lk21 <judul>']
handler.tags = ['internet']
handler.command = /^lk21$/i
export default handler