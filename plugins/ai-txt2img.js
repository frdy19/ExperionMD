import fetch from "node-fetch"

let handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
  if (!text) throw 'Contoh: .txt2img highly detailed, intricate, 4k, 8k, sharp focus, detailed hair, detailed'
  m.reply('Tunggu sebentar...')
  let anu = `https://aemt.me/ai/text2img?text=${encodeURIComponent(text)}`
  let result = await Promise.all([anu, anu, anu].map(async (url, index) => {
    let res = await fetch(url)
    if (!res.ok) throw `${res.status} ${res.statusText}`
    return conn.sendFile(m.chat, await res.buffer(), 'result_' + (index + 1) + '.jpg', `Hasil ke-${index + 1}: ${text}`, m)
  }))
}

handler.help = ['aiimg']
handler.tags = ['aiv2']
handler.command = /^(txt2img|aiimg)$/i
handler.limit = true
export default handler
/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (t.me/VLShop2)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/