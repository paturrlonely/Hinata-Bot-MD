import fetch from 'node-fetch'

const handler = async (m, { conn, usedPrefix, text }) => {
  if (!m.isGroup) throw '📢 Este comando solo se puede usar en grupos, Onii-chan~ 🫂'

  let who = m.mentionedJid?.[0] || m.quoted?.sender
  if (!who) throw `🚩 Por favor, responde o menciona a alguien para abrazar 🫂`

  // Lista de videos tipo abrazo
  const abrazos = [
    "https://telegra.ph/file/4d80ab3a945a8446f0b15.mp4",
    "https://telegra.ph/file/ef3a13555dfa425fcf8fd.mp4",
    "https://telegra.ph/file/582e5049e4070dd99a995.mp4",
    "https://telegra.ph/file/ab57cf916c5169f63faee.mp4",
    "https://telegra.ph/file/fce96960010f6d7fc1670.mp4",
    "https://telegra.ph/file/33332f613e1ed024be870.mp4"
  ]

  const videoRandom = abrazos[Math.floor(Math.random() * abrazos.length)]
  const senderTag = '@' + m.sender.split('@')[0]
  const targetTag = '@' + who.split('@')[0]
  const caption = `${senderTag} le está dando un abrazo bien apretadito a ${targetTag} 🫂💞`

  await conn.sendMessage(m.chat, {
    video: { url: videoRandom },
    gifPlayback: true,
    caption,
    mentions: [m.sender, who]
  }, { quoted: m })
}

handler.help = ['abrazar @usuario']
handler.tags = ['fun']
handler.command = ['abrazar']
handler.group = true
handler.register = true

export default handler
