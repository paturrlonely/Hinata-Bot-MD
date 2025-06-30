import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

let contadorDespedidas = 0;

export async function before(m, { conn, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return;

  const user = m.messageStubParameters?.[0];
  if (!user) return;
  const usuario = `@${user.split('@')[0]}`;
  const subject = groupMetadata.subject;
  const descs = groupMetadata.desc || 'Descripción predeterminada del grupo.';
  const pp = await conn.profilePictureUrl(user, 'image').catch(_ => 'https://o.uguu.se/NldcxMaY.jpg');
  const img = await (await fetch(pp)).buffer();

  // 🎉 BIENVENIDA
  if (m.messageStubType === 27) {
    const textWel = `
┏━━━━━❖━━━✦━━━❖━━━━━┓
┃  💗 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎/𝐀 ✨
┗━━━━━❖━━━✦━━━❖━━━━━┛

💗 Hola ${usuario}~
🌷 Bienvenido/a a 『${subject}』

🫶 Aquí solo hay:
– 𝐏𝐚𝐳 𝐄𝐧𝐭𝐫𝐞 𝐀𝐦𝐢𝐠𝐨𝐬  
– 𝐂𝐚𝐨𝐬 𝐄𝐧𝐭𝐫𝐞 𝐀𝐦𝐢𝐠𝐨𝐬  
– 𝐋𝐚 𝐌𝐞𝐣𝐨𝐫 𝐁𝐨𝐭 𝐐𝐮𝐞 𝐇𝐚𝐲

💬 Escribe *#menu* para ver mis comandos
📌 Lee la descripción:
> ${descs}

❤️ Disfruta del grupo. Espero que no causes problemas~`;

    await conn.sendMessage(m.chat, {
      image: img,
      caption: textWel,
      mentions: [user]
    });

    // Audio de bienvenida
    await conn.sendMessage(m.chat, {
      audio: { url: 'https://d.uguu.se/xAkjtaZN.mp4' },
      mimetype: 'audio/mp4',
      ptt: true
    });
  }

  // ❌ DESPEDIDA (salida o expulsión)
  else if (m.messageStubType === 32 || m.messageStubType === 28) {
    contadorDespedidas++;

    if (contadorDespedidas % 4 === 1) {
      const textBye = `
┏━━━━━❖━━━✦━━━❖━━━━━┓
┃🕊️ 𝐒𝐄 𝐅𝐔𝐄 𝐔𝐍𝐀 𝐀𝐋𝐌𝐀 🕊️
┗━━━━━❖━━━✦━━━❖━━━━━┛

𝐀𝐝𝐢𝐨𝐬 ${usuario}...

💩 No es como si te fuéramos a extrañar, ¿ok?
🌪️ El grupo acaba de subir +10 en calidad.

🍃 Que la vida te dé lo que mereces... y ojalá no vuelvas, cabrón.
`;

      await conn.sendMessage(m.chat, {
        image: img,
        caption: textBye,
        mentions: [user]
      });

    } else if (contadorDespedidas % 4 === 2) {
      await conn.sendMessage(m.chat, {
        audio: { url: 'https://n.uguu.se/QvXOZXEJ.mp4' },
        mimetype: 'audio/mp4',
        ptt: true
      });

    } else if (contadorDespedidas % 4 === 3) {
      // 🎧 AUDIO CON CAPTION CÓMICO
      await conn.sendMessage(m.chat, {
        audio: { url: 'https://qu.ax/LwtoC.mp4' }, // Puedes cambiar este link por otro audio si lo deseas
        mimetype: 'audio/mp4',
        ptt: true,
        caption: `🌫️ ${usuario} se fue como vino: sin avisar y sin importancia.`,
        mentions: [user]
      });

    } else {
      await conn.sendMessage(m.chat, {
        audio: { url: 'https://qu.ax/kFzwA.mp4' },
        mimetype: 'audio/mp4',
        ptt: true
      });
    }
  }
}
