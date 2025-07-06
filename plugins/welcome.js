import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

// 💖 Personaliza estas variables globales:
const textbot = '🌸 HINATA BOT 🌸'
const dev = '💥 github.com/TOKIO5025 💥'
const estilo = {} // opcional: mensaje citado para la respuesta

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup || !m.messageStubParameters) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://cdnmega.vercel.app/media/gsw1gLhC@ew68pKDxFue1JI_z7IgeAiR61Swwz5QS0aChvcZM9CI'

  if (chat.welcome) {
    let img
    try {
      let pp = await conn.profilePictureUrl(who, 'image')
      img = await (await fetch(pp)).buffer()
    } catch {
      img = await (await fetch(defaultImage)).buffer()
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `┏╼🌸 *${textbot}* 🌸
┋✨ 𝑯𝒐𝒍𝒊𝒘𝒊~ ${taguser} 😚
┋💖 Bienvenid@ al grupo *${groupMetadata.subject}*
┋🥺 Espero que hables o te doy nalgaditas~
┋🔪 Si te sales sin avisar... *te busco* 😳
┗━━━━━━━━━━━━━━━💞`

      await conn.sendMessage(m.chat, {
        image: img,
        caption: bienvenida,
        mentions: [who]
      }, { quoted: estilo })
    }

    if (
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
    ) {
      let groseria = `┏╼💥 *${textbot}* 💥
┋👋 𝑨𝒅𝒊ó𝒔 ${taguser}~ 
┋😒 Ni falta hacías, culero/a...
┋🍑 Que te vaya bien por donde te quepa 😌
┗━━━━━━━━━━━━━━━🔥
${dev}`

      await conn.sendMessage(m.chat, {
        image: img,
        caption: groseria,
        mentions: [who]
      }, { quoted: estilo })
    }
  }

  return true
}
