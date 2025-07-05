var handler = async (m, { conn, usedPrefix, command, text }) => {
  let number;

  if (isNaN(text) && !text.match(/@/g)) {
    // No válido, continúa abajo
  } else if (isNaN(text)) {
    number = text.split`@`[1]
  } else if (!isNaN(text)) {
    number = text
  }

  if (!text && !m.quoted) {
    return conn.reply(m.chat, `🌸 Onii-chan... tienes que responder o mencionar a alguien para quitarle el admin, ¿sí? 🥺`, m)
  }

  if (number && (number.length > 13 || (number.length < 11 && number.length > 0))) {
    return conn.reply(m.chat, `💢 Ese número no es válido... ¡No me hagas enojar, baka! 😠`, m)
  }

  let user;

  try {
    if (text) {
      user = number + '@s.whatsapp.net'
    } else if (m.quoted && m.quoted.sender) {
      user = m.quoted.sender
    } else if (m.mentionedJid && m.mentionedJid[0]) {
      user = m.mentionedJid[0]
    } else {
      return conn.reply(m.chat, `😳 Eh... ¿y a quién quieres bajarle de admin, Onii-chan? Mencióname a alguien o respóndele`, m)
    }
  } catch (e) {
    return conn.reply(m.chat, `😭 Ay no... algo salió mal, inténtalo otra vez, porfis.`, m)
  }

  // Quitar admin
  await conn.groupParticipantsUpdate(m.chat, [user], 'demote')

  conn.reply(m.chat, `💔 ${user.split('@')[0]}-chan ya no es admin... ¡Pero aún te quiero! 😿💕`, m)
}

handler.help = ['demote']
handler.tags = ['grupo']
handler.command = ['demote', 'quitaradmin', 'rebajar']

handler.admin = true
handler.botAdmin = true

export default handler
