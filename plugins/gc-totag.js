let handler = async (m, { conn, participants }) => {
  // Obtener todos los usuarios menos el bot
  let users = participants.map(u => u.id).filter(v => v !== conn.user.jid);

  if (!m.quoted) {
    throw '*[ 💠 ] Por favor, responde a un mensaje para mencionarlo a todos.*';
  }

  // Reenviar el mensaje citado y mencionar a todos los usuarios
  await conn.sendMessage(m.chat, {
    forward: m.quoted.fakeObj,
    mentions: users
  });
};

handler.help = ['totag'];
handler.tags = ['grupo'];
handler.command = /^(totag|tag|n)$/i;

handler.admin = true;
handler.group = true;

export default handler;
