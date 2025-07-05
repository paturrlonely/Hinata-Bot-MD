const handler = async (m, { conn }) => {
  // Verifica si se está respondiendo a un mensaje
  if (!m.quoted) {
    await conn.sendMessage(m.chat, {
      text: '✋ Usa *.gettext* respondiendo a un estado de texto o cualquier mensaje de texto.',
    }, { quoted: m });
    return;
  }

  let targetMsg = m.quoted;
  const mtype = targetMsg.mtype || '';

  // Validar que sea un mensaje de texto
  const isText = ['conversation', 'extendedTextMessage'].includes(mtype);
  if (!isText && !targetMsg.text) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    return await m.reply('⚠️ Este comando solo funciona con *mensajes de texto*, Onii-chan~ 💌');
  }

  try {
    // ⚡ Reacción al mensaje original
    await conn.sendMessage(m.chat, {
      react: { text: '⚡', key: targetMsg.key }
    });

    // Enviar el texto citado al privado del autor del comando
    await conn.sendMessage(m.sender, {
      text: `📩 Mensaje reenviado:\n\n${targetMsg.text || targetMsg.body || 'Sin contenido de texto visible 😿'}`,
    }, { quoted: m });

    // Aviso coqueto si es grupo
    if (m.isGroup) {
      await conn.sendMessage(m.chat, { 
        text: `✅ @${m.sender.split('@')[0]}, ya te mandé el mensajito por privado 💌`, 
        mentions: [m.sender]
      });
    }

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    await m.reply('⚠️ No pude enviarte el texto, Onii-chan~ Revisa si el mensaje era válido 😿');
  }
};

handler.help = ['gettext'];
handler.tags = ['tools'];
handler.command = ['gettext', 'gettexto', 'revitexto'];

export default handler;
