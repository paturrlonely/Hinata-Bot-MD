import fetch from 'node-fetch'
import sharp from 'sharp'
import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply(`✳️ Escribe una palabra para buscar stickers.\n\nEjemplo:\n*${command} gato*`)

  try {
    const res = await fetch(`https://opendrip-api.onrender.com/api/sticker?q=${encodeURIComponent(text)}`)
    if (!res.ok) throw `❌ No se pudo conectar con la API. Código HTTP: ${res.status}`

    const data = await res.json()
    if (!data.estado || !Array.isArray(data.resultados)) throw `⚠️ Respuesta inválida de la API.`

    const stickers = []

    for (let s of data.resultados) {
      const url = s.thumbnail
      if (!url || !url.startsWith('http')) continue

      const imgBuffer = await fetch(url).then(res => res.buffer())

      const webpBuffer = await sharp(imgBuffer)
        .resize(512, 512)
        .webp({ lossless: true })
        .toBuffer()

      const stickerBuffer = await addExif(webpBuffer, text, 'NEME BOT')
      stickers.push({ sticker: stickerBuffer })
      if (stickers.length >= 5) break // Solo 5 stickers
    }

    if (!stickers.length) throw '⚠️ No se encontraron stickers válidos.'

    await m.reply(`🧩 *Paquete de stickers encontrados para:* ${text}`)
    await conn.sendMessage(m.chat, {
      image: { url: data.resultados[0]?.thumbnail },
      caption: `✨ Enviando *${stickers.length}* stickers...`
    }, { quoted: m })

    for (let s of stickers) {
      await conn.sendMessage(m.chat, s, { quoted: m })
    }

  } catch (err) {
    let msg = typeof err === 'string' ? err : (err.message || JSON.stringify(err))
    m.reply(`❌ Ocurrió un error:\n\n${msg}`)
  }
}

handler.command = ['stickerpack', 'flasticker']
handler.help = ['stickerpack <palabra>']
handler.tags = ['sticker']
handler.limit = 1
handler.register = true

export default handler
