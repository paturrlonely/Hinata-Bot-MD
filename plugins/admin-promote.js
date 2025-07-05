var handler = async (m, { conn, usedPrefix, command, text }) => {
  // Validar número o mención
  let number;

  if (isNaN(text) && !text.match(/@/g)) {
    // no hace nada aquí porque no tiene texto válido
  } else if (isNaN(text)) {
    number = text.split`@`[1]
  } else if (!isNaN(text)) {
    number = text
  }

  if (!text && !m.quoted) {
    return conn.reply(m.chat, `🌸 Onii-chan, tienes que responder o mencionar a alguien para que pueda hacerlo admin, ¿vale? 🥺💕`, m)
  }

  if (number && (number.length > 13 || (number.length < 11 && number.length > 0))) {
    return conn.reply(m.chat, `✨️ Onii-chan, el número que pusiste no me cuadra... ¿Puedes revisar y decirme otra vez? 😳`, m)
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
      return conn.reply(m.chat, `🌸 Ay, no entendí a quién quieres promover. Por favor, mencionalo o respóndele al mensaje, ne? 💕`, m)
    }
  } catch (e) {
    return conn.reply(m.chat, `😢 Ups, algo salió mal... intenta de nuevo, por favor.`, m)
  }

  // Promover al usuario a admin
  await conn.groupParticipantsUpdate(m.chat, [user], 'promote')

  conn.reply(m.chat, `✨ Felicidades, ${user.split('@')[0]}-chan~ Ahora eres admin del grupo 🥰🎉`, m)
}

handler.help = ['promote']
handler.tags = ['grupo']
handler.command = ['promote', 'darpija', 'promover']

handler.admin = true
handler.botAdmin = true

export default handler
