/* Código creado por Deylin y API también
https://github.com/deylin-eliac 
  no quites créditos 
 Atte: Deylin-eliac */

let handler = async (m, { text, conn, usedPrefix, command, isROwner, isPrems }) => {
  const fake = { quoted: m }; // Respuesta simulada
  const emojis = '✨'; // Emoji decorativo

  // Verificación de si está permitido en canales (r.canal)
  if (!global.db.data.chats[m.chat].canal && !isROwner && !isPrems) {
    return conn.reply(m.chat, '❌ Este comando solo está disponible en canales autorizados.\nActívalo con: *.rcanal on*', m);
  }

  // Si no escribe nada, se le pide un prompt
  if (!text) {
    return await conn.reply(
      m.chat,
      `${emojis} Dime qué imagen deseas generar.\nEjemplo:\n${usedPrefix}${command} un gato con una gata jugando`,
      m,
      fake
    );
  }

  await conn.reply(
    m.chat,
    `${emojis} Generando imagen con: "${text}", espera un momento...`,
    m,
    fake
  );

  try {
    const prompt = encodeURIComponent(text.trim());
    const imageUrl = `https://anime-xi-wheat.vercel.app/api/ia-img?prompt=${prompt}`;

    const bloqueCodigo = ['```', '🧠 Imaginación IA', '```'].join('\n');

    await conn.sendFile(
      m.chat,
      imageUrl,
      'imagen.jpg',
      `${bloqueCodigo}\n🖼️ Imagen generada con el prompt:\n"${text}"`,
      m
    );
  } catch (e) {
    console.error(e);
    m.reply(`❌ Ocurrió un error al generar la imagen:\n${e.message}`);
  }
};

handler.help = ['imagina <texto>'];
handler.tags = ['ia'];
handler.command = ['imgia', 'imagina'];
handler.register = true;
handler.canal = true; // <- Esto activa r.canal

export default handler;
