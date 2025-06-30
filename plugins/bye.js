let despedidaAlterna = {}; // Guardamos por grupo

let handler = async (m, { conn, participants }) => {
  const chat = global.db.data.chats[m.chat];
  if (!chat.bye) return;

  const leftUsers = participants.filter(p => p.action === 'remove').map(p => p.id);
  if (!leftUsers.length) return;

  // Inicializa si no hay
  if (!despedidaAlterna[m.chat]) despedidaAlterna[m.chat] = 0;

  for (const user of leftUsers) {
    try {
      const userName = await conn.getName(user);
      const groupName = await conn.getName(m.chat);
      const mention = `@${user.split('@')[0]}`;
      const index = despedidaAlterna[m.chat] % 4;

      if (index === 0) {
        // TEXTO 1
        const msg = `
👋 *${mention}* ha abandonado el grupo...

✨ Esperamos que *no vuelvas con tus dramas*, en *${groupName}*. 
🥀 ¡Buena suerte... porque aquí ya no!`;

        await conn.sendMessage(m.chat, {
          text: msg.trim(),
          mentions: [user]
        });

      } else if (index === 1) {
        // AUDIO 1
        await conn.sendMessage(m.chat, {
          audio: { url: 'https://d.uguu.se/xAkjtaZN.mp4' },
          mimetype: 'audio/mp4',
          ptt: true
        });

      } else if (index === 2) {
        // TEXTO 2
        const msg2 = `
📤 *@${user.split('@')[0]}* salió del grupo...

🔕 Un usuario menos, menos notificaciones, menos problemas.
💅 ¡El universo está sanando!`;

        await conn.sendMessage(m.chat, {
          text: msg2.trim(),
          mentions: [user]
        });

      } else if (index === 3) {
        // AUDIO 2
        await conn.sendMessage(m.chat, {
          audio: { url: 'https://qu.ax/LwtoC.mp4' },
          mimetype: 'audio/mp4',
          ptt: true
        });
      }

      // Aumentar contador
      despedidaAlterna[m.chat]++;
    } catch (e) {
      console.error(`❌ Error al despedir a ${user}:`, e);
    }
  }
};

handler.groupParticipantsUpdate = true;
export default handler;