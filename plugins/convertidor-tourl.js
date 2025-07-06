import fs from "fs"
import fetch from "node-fetch"
import FormData from "form-data"
import { fileTypeFromFile } from "file-type"

let handler = async m => {
  try {
    const q = m.quoted || m
    const mime = q.mediaType || ""

    if (!/image|video|audio|sticker|document/.test(mime))
      throw `
╭─❍ 𓂃 💌 ⌗ ʜɪɴᴀᴛᴀ-ʙᴏᴛ ⊰❀
│🌸 Responde a una imagen, video, audio o archivo...
│✨ ¡Lo convertiré en un enlace mágico para ti!
╰─────────────✧
`

    const media = await q.download(true)
    const stats = fs.statSync(media)
    const sizeKB = (stats.size / 1024).toFixed(2) + " KB"

    if (stats.size === 0) {
      await m.reply(`┏彡 💔 Oopsi...
┃🌸 El archivo es muy ligerito...
┃🧸 No puedo subirlo así, ¿me das otro?
┗彡`)
      await fs.promises.unlink(media)
      return
    }

    if (stats.size > 1073741824) {
      await m.reply(`
╭─❍ 🚫 Tamaño superado
│😿 Este archivo pesa más de 1GB.
│🎀 No puedo con tanto, lo siento...
╰───────────────`)
      await fs.promises.unlink(media)
      return
    }

    // Subidas
    const uguu = await uploadUguu(media)
    const tmpfiles = await uploadTmpFiles(media)
    const litter = await uploadLitterbox(media)
    const telegraph = await uploadTelegraph(media)

    // Mensaje decorado
    const msg = `
乂  *L I N K S - E N L A C E S*  乂

*🌸 Uguu*
• Enlace: ${uguu}
• Tamaño: ${sizeKB}
• Expiración: 24h aprox

*🍥 TmpFiles*
• Enlace: ${tmpfiles}
• Tamaño: ${sizeKB}
• Expiración: Desconocido

*🐾 Litterbox*
• Enlace: ${litter}
• Tamaño: ${sizeKB}
• Expiración: 24h

*📜 Telegraph*
• Enlace: ${telegraph}
• Tamaño: ${sizeKB}
• Expiración: No expira

╰⊹⃝ ⍴᥆ᥕᥱrᥱძ ᑲᥡ  🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
_♡ Presiona un enlace para copiar..._
`.trim()

    await m.reply(msg)
    await fs.promises.unlink(media)

  } catch (e) {
    await m.reply(`
╭─❍ 😵‍💫 Error
│❗ ${e}
╰────────────`)
  }
}

handler.help = ["tourl", "t"]
handler.tags = ["tools"]
handler.command = /^(t|tourl)$/i
export default handler

// 🌸 Subidas individuales
async function uploadUguu(filePath) {
  const form = new FormData()
  form.append("files[]", fs.createReadStream(filePath))
  const res = await fetch("https://uguu.se/upload.php", {
    method: "POST",
    body: form,
    headers: form.getHeaders()
  })
  const json = await res.json()
  return json.files[0]?.url
}

async function uploadTmpFiles(filePath) {
  const form = new FormData()
  form.append("file", fs.createReadStream(filePath))
  const res = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: form
  })
  const json = await res.json()
  return json?.data?.url || "❌ Falló"
}

async function uploadLitterbox(filePath) {
  const form = new FormData()
  form.append("reqtype", "fileupload")
  form.append("time", "24h")
  form.append("fileToUpload", fs.createReadStream(filePath))
  const res = await fetch("https://litter.catbox.moe/api.php", {
    method: "POST",
    body: form
  })
  const url = await res.text()
  return url
}

async function uploadTelegraph(filePath) {
  const type = await fileTypeFromFile(filePath)
  if (!type || !/image\/(jpeg|png|gif)/.test(type.mime))
    return "❌ Solo imágenes JPG/PNG/GIF"

  const form = new FormData()
  form.append("file", fs.createReadStream(filePath))
  const res = await fetch("https://telegra.ph/upload", {
    method: "POST",
    body: form
  })
  const json = await res.json()
  return "https://telegra.ph" + (json[0]?.src || "")
  }
