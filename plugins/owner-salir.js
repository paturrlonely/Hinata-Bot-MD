let handler = async (m, { conn, text }) => {
  let id = text ? text : m.chat;
  let chat = global.db.data.chats[m.chat];
  chat.welcome = false;

  const textoSalida = `
╭─────────────𓆩⟡𓆪─────────────╮
🌸 *Hinata-Bot se va, perras...* 💢
╰─────────────𓆩⟡𓆪─────────────╯
✦ Me largo de este pinche grupo 😤
✦ Ya no aguanto tanta idiotez 💅
✦ Sean felices sin mí, bola de pendej*s 💋
  `;

  try {
    await conn.reply(id, textoSalida, m);
    await conn.groupLeave(id);
    chat.welcome = true;
  } catch (e) {
    await m.reply('❌ Onii-chan, hubo un error al intentar salirme... ¿Me ayudas? 😿');
    console.error(e);
  }
};

handler.command = ['salir', 'leavegc', 'salirdelgrupo', 'leave'];
handler.group = true;
handler.rowner = true;

export default handler;
