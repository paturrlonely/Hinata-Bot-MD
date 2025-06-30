const handler = async (m, { conn }) => {
  // Si no está respondiendo a nada, enviar mensaje de advertencia
  if (!m.quoted) {
    await conn.sendMessage(m.chat, {
      text: '✋ Escribe *.get* respondiendo a un estado del grupo o a un estado reenviado de un contacto.',
    }, { quoted: m });
    return;
  }

  let targetMsg = m.quoted;
  const mtype = targetMsg.mtype || '';

  if (!['imageMessage', 'videoMessage', 'audioMessage'].includes(mtype)) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    return await m.reply('⚠️ Este comando solo funciona con imágenes, videos o audios de estados.');
  }

  try {
    const media = await targetMsg.download();

    if (mtype === 'imageMessage') {
      await conn.sendMessage(m.sender, {
        image: media,
        caption: '🖼️ Aquí tienes la copia del estado que solicitaste.'
      }, { quoted: m });

    } else if (mtype === 'videoMessage') {
      await conn.sendMessage(m.sender, {
        video: media,
        caption: '🎥 Aquí tienes la copia del estado que solicitaste.'
      }, { quoted: m });

    } else if (mtype === 'audioMessage') {
      await conn.sendMessage(m.sender, {
        audio: media,
        mimetype: 'audio/mp4',
        ptt: true
      }, { quoted: m });
    }

    if (m.isGroup) {
      await conn.sendMessage(m.chat, { 
        text: `✅ @${m.sender.split('@')[0]}, te mandé por privado el estado.`, 
        mentions: [m.sender]
      });
    }

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    await m.reply('⚠️ No pude descargar el estado. Asegúrate de que sea válido.');
  }
};

handler.help = ['get'];
handler.tags = ['tools'];
handler.command = ['get', 'getstatu', 'robarestado'];

export default handler;
