import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`📌 Usa el comando así:\n${usedPrefix + command} <texto>\n\nEjemplo:\n${usedPrefix + command} naruto`);

  const query = args.join(' ');
  const url = `https://api.sylphy.xyz/stickerly/search?q=${encodeURIComponent(query)}&limit=20`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (!json || !json.results || json.results.length === 0) {
      return m.reply('❌ No encontré stickers con ese nombre.');
    }

    const pack = json.results[Math.floor(Math.random() * json.results.length)];
    const { name, author, thumbnail, stickers } = pack;

    let text = `✨ *Resultado encontrado:*\n📦 *Nombre:* ${name}\n👤 *Autor:* ${author}\n📎 *Stickers disponibles:* ${stickers.length}`;

    // Envía miniatura con datos
    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: text,
      buttons: [
        { buttonId: `.stickerpack ${pack.id}`, buttonText: { displayText: '🔍 Ver Stickers' }, type: 1 },
      ],
      footer: '🌟 Stickerly API',
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('⚠️ Error al buscar stickers. Intenta más tarde.');
  }
};

handler.command = /^stickerly$/i;
export default handler;
