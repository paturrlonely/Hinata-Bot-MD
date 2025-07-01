import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command, isAdmin, isBotAdmin, isOwner, isNSFW, isPrivate, chat }) => {
  // Protege el comando solo para NSFW permitido
  if (!isNSFW && !isPrivate) {
    return m.reply('❌ Este comando solo está permitido en chats con modo NSFW activado.\n\nActívalo con: *.enable nsfw*');
  }

  try {
    const res = await fetch('https://api.sylphy.xyz/nsfw/hentai');
    const data = await res.json();

    if (!data || !data.url) return m.reply('❌ No se pudo obtener una imagen hentai.');

    await conn.sendMessage(m.chat, {
      image: { url: data.url },
      caption: `🍑 *Hentai generado por Sylphy API*\n\n📸 Fuente: NSFW`,
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('⚠️ Ocurrió un error al obtener el hentai. Intenta más tarde.');
  }
};

handler.command = /^hentai$/i;
handler.tags = ['nsfw'];
handler.help = ['hentai'];
handler.nsfw = true; // importante para el filtro de comandos
handler.premium = false;

export default handler;
