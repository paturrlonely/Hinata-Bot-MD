const handler = async (m, { conn, text, usedPrefix, command }) => {
  let jid;

  if (m.quoted) {
    // Si responden a un mensaje, tomamos el dueño
    jid = m.quoted.sender || m.quoted.key.participant || m.quoted.key.remoteJid;
  } else if (text) {
    // Normalizamos el número o usamos la mención
    const numero = text.replace(/\D/g, '');
    if (numero.length >= 8) {
      jid = numero + '@s.whatsapp.net';
    } else if (m.mentionedJid && m.mentionedJid.length) {
      jid = m.mentionedJid[0];
    } else {
      return conn.reply(m.chat, `✳️ Uso correcto:\n${usedPrefix + command} +50248019799\nO responde a un mensaje o menciona a alguien.`, m);
    }
  } else if (m.mentionedJid && m.mentionedJid.length) {
    jid = m.mentionedJid[0];
  } else {
    return conn.reply(m.chat, `✳️ Uso correcto:\n${usedPrefix + command} +50248019799\nO responde a un mensaje o menciona a alguien.`, m);
  }

  try {
    // Obtener foto de perfil
    const url = await conn.profilePictureUrl(jid, 'image');
    // Obtener nombre visible
    const name = await conn.getName(jid);

    await conn.sendMessage(m.chat, {
      image: { url },
      caption: `📸 Foto de perfil de @${jid.split('@')[0]}\n👤 Nombre: ${name}`,
      mentions: [jid]
    }, { quoted: m });

  } catch {
    return conn.reply(m.chat, '❌ No se pudo obtener la foto o el nombre. Puede que el usuario no tenga foto o tenga privacidad restringida.', m);
  }
};

handler.help = ['rpf2 <numero|mencion>'];
handler.tags = ['tools'];
handler.command = ['rpf2'];

export default handler;