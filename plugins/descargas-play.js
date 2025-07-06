// 
// versión estilo Hinata 💮

import fetch from "node-fetch"
import yts from "yt-search"
import axios from "axios"

const formatAudio = ["mp3", "m4a", "webm", "acc", "flac", "opus", "ogg", "wav"]
const formatVideo = ["360", "480", "720", "1080", "1440", "4k"]

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error("⚠️ Hinata-chan dice: ese formato no es compatible~");
    }

    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: { "User-Agent": "Mozilla/5.0" }
    }

    try {
      const response = await axios.request(config)
      if (response.data?.success) {
        const { id, title, info } = response.data
        const downloadUrl = await ddownr.cekProgress(id)
        return { id, title, image: info.image, downloadUrl }
      } else {
        throw new Error("⛔ Hinata no pudo encontrar los detalles del video...");
      }
    } catch (error) {
      console.error("❌ Error:", error)
      throw error
    }
  },

  cekProgress: async (id) => {
    const config = {
      method: "GET",
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: { "User-Agent": "Mozilla/5.0" }
    }

    try {
      while (true) {
        const response = await axios.request(config)
        if (response.data?.success && response.data.progress === 1000) {
          return response.data.download_url
        }
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    } catch (error) {
      console.error("❌ Error:", error)
      throw error
    }
  }
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('⚡️')

  if (!text.trim()) {
    return conn.reply(m.chat, "⋆｡ﾟ☁︎｡ ¡Hinata está lista! Pero necesito saber el nombre de la canción que buscas~ escribe algo como:\n*.play tu canción favorita* 💿✨", m)
  }

  try {
    const search = await yts(text)
    if (!search.all.length) {
      return m.reply("｡･ﾟ(ﾟ>﹏<)ﾟ･｡ Hinata no pudo encontrar nada con ese nombre... ¿seguro que lo escribiste bien? 💭")
    }

    const videoInfo = search.all[0]
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo
    const vistas = formatViews(views)
    const thumb = (await conn.getFile(thumbnail))?.data

    const infoMessage = `
╭─━━━━━━༺💿༻━━━━━━─╮
     ♫  𝐇𝐢𝐧𝐚𝐭𝐚-𝐁𝐨𝐭 ♫
╰─━━━━━━༺⚡༻━━━━━━─╯

🌸 *Título:* ${title}
⏱️ *Duración:* ${timestamp}
👩‍🎤 *Canal:* ${videoInfo.author?.name || "Desconocido"}
👀 *Vistas:* ${vistas}
📅 *Publicado:* ${ago}
🔗 *Enlace:* ${url}

꒰ Hinata está preparando tu descarga ~ ♡ ꒱
`

    await m.react('🎧')
    await conn.sendMessage(m.chat, {
      image: thumb,
      caption: infoMessage
    }, { quoted: m })

    // Audio
    if (["play", "yta", "ytmp3"].includes(command)) {
      const api = await ddownr.download(url, "mp3")

      return await conn.sendMessage(m.chat, {
        audio: { url: api.downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
        caption: "🎵 ¡Listo! Aquí tienes tu canción, disfruta mucho~ 💖"
      }, { quoted: m })
    }

    // Video
    if (["play2", "ytv", "ytmp4"].includes(command)) {
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
        `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ]

      let success = false
      for (let source of sources) {
        try {
          const res = await fetch(source)
          const { data, result, downloads } = await res.json()
          let downloadUrl = data?.dl || result?.download?.url || downloads?.url || data?.download?.url

          if (downloadUrl) {
            success = true
            await conn.sendMessage(m.chat, {
              video: { url: downloadUrl },
              fileName: `${title}.mp4`,
              mimetype: "video/mp4",
              caption: "🎬 Aquí tienes tu video, descargado por *Hinata-Bot* ✨💮",
              thumbnail: thumb
            }, { quoted: m })
            break
          }
        } catch (e) {
          console.error(`⚠️ Error con la fuente ${source}:`, e.message)
        }
      }

      if (!success) {
        return m.reply("❌ Hinata no pudo encontrar un enlace válido para descargar tu video... intenta con otro título 💔")
      }
    }

  } catch (error) {
    console.error("❌ Error:", error)
    return m.reply(`⚠️ Hinata tuvo un error eléctrico~: ${error.message}`)
  }
}

handler.command = handler.help = ["play", "play2", "ytmp3", "yta", "ytmp4", "ytv"]
handler.tags = ["downloader"]
handler.register = true

export default handler

function formatViews(views) {
  if (typeof views !== "number" || isNaN(views)) return "Desconocido"
  return views >= 1000
    ? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
    : views.toString()
}
