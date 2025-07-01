import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  try {
    // puedes comentar o eliminar estas líneas si solo quieres el mensaje
    // const res = await fetch('https://api.sylphy.xyz/nsfw/hentai');
    // const data = await res.json();

    return m.reply('❌ No se pudo obtener una imagen hentai.');

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
