import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  try {
    const res = await fetch('https://api.sylphy.xyz/nsfw/hentai');
    const data = await res.json();

    if (!data || !data.url) {
      return m.reply('❌ No se pudo obtener una imagen hentai.');
    }

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
handler.premium = false;

export default handler;
