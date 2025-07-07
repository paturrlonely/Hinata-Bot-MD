/* creador del código 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲✨ */

let handler = async (m, { conn, command }) => {
  if (!m.quoted) return m.reply(`⚠️ Responde a un mensaje para ${command === 'pin' ? 'fijarlo' : 'desfijarlo'}.`);
  try {
    let messageKey = {
      remoteJid: m.chat,
      fromMe: m.quoted.fromMe,
      id: m.quoted.id,
      participant: m.quoted.sender
    };

    if (command === 'pin' || command === 'fijar') {
      await conn.sendMessage(m.chat, { pin: messageKey, type: 1, time: 604800 });
      m.react("✅️");
    }

    if (command === 'unpin' || command === 'desfijar') {
      await conn.sendMessage(m.chat, { pin: messageKey, type: 2, time: 86400 });
      m.react("✅️");
    }

    if (command === 'destacar') {
      conn.sendMessage(m.chat, { keep: messageKey, type: 1, time: 15552000 });
      m.react("✅️");
    }

    if (command === 'desmarcar') {
      conn.sendMessage(m.chat, { keep: messageKey, type: 2, time: 86400 });
      m.react("✅️");
    }
  } catch (error) {
    console.error(error);
  }
};

handler.help = ['pin'];
handler.tags = ['grupo'];
handler.command = ['fijar', 'unpin', 'desfijar', 'destacar', 'desmarcar'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
handler.register = true;

export default handler;
