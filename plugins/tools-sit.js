import axios from 'axios';
import fs from 'fs';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text) return m.reply(`⚠️ Escribe el link del sitio o archivo.\n\nEjemplo:\n${usedPrefix + command} https://files.catbox.moe/1lthxq.mp4`);

  try {
    const url = text;

    // 🔍 Verifica si es archivo directo (video, mp4, etc.)
    const res = await axios.head(url);
    const tipo = res.headers['content-type'];

    if (tipo.includes('video') || url.endsWith('.mp4')) {
      m.reply('⬇️ Descargando el video...');

      let nombre = `video_${Date.now()}.mp4`;
      const buffer = await (await fetch(url)).buffer();
      fs.writeFileSync(`./tmp/${nombre}`, buffer);

      await conn.sendFile(m.chat, `./tmp/${nombre}`, nombre, `🎬 Video descargado correctamente!\n\n🔥 Reacciones: 👍💯😎`, m);
      fs.unlinkSync(`./tmp/${nombre]`); // Limpia el archivo después
    } else {
      // Si es una página web
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const titulo = $('title').text() || 'Sin título';
      const textoPlano = $('body').text().slice(0, 500);

      await m.reply(`🌐 Título del sitio: ${titulo}\n\n📝 Fragmento del contenido:\n${textoPlano.trim()}...\n\n👍🔥`);
    }
  } catch (e) {
    console.log(e);
    m.reply('❌ Error al procesar el link. Asegúrate que sea un link válido.');
  }
};

handler.help = ['sit <url>'];
handler.tags = ['tools', 'downloader'];
handler.command = /^sit|linkinfo|getsite$/i;

export default handler;
