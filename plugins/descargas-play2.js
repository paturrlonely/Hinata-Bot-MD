import fetch from 'node-fetch';
import yts from 'yt-search';

const encodedApi = "aHR0cHM6Ly9hcGkudnJlZGVuLndlYi5pZC9hcGkveXRtcDM=";
const getApiUrl = () => Buffer.from(encodedApi, "base64").toString("utf-8");

const isYoutubeLink = (text) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(text);

const fetchWithRetries = async (url, maxRetries = 2) => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data?.status === 200 && data.result?.download?.url) {
        return data.result;
      }
    } catch (error) {
      console.error(`Intento ${attempt + 1} fallido:`, error.message);
    }
  }
  throw new Error("No se pudo obtener el audio después de varios intentos.");
};

let handler = async (m, { conn, text }) => {
  if (!text?.trim()) {
    await conn.sendMessage(m.chat, { react: { text: "❓", key: m.key } });
    return conn.reply(m.chat, '*[ ℹ️ ] Ingresa el nombre o link de una canción.*\n\n*Ejemplo:* .ytmp3 El venao\n*Ejemplo:* .ytmp3 https://youtu.be/abc123', m);
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    let videoUrl, videoTitle;

    if (isYoutubeLink(text.trim())) {
      videoUrl = text.trim();
      videoTitle = "audio"; // nombre temporal si no hay título
    } else {
      const search = await yts(text.trim());
      const vid = search.videos[0];
      if (!vid) throw '⚠️ No se encontraron resultados para esa búsqueda.';
      videoUrl = vid.url;
      videoTitle = vid.title;
    }

    const apiUrl = `${getApiUrl()}?url=${encodeURIComponent(videoUrl)}`;
    const result = await fetchWithRetries(apiUrl);
    const audioUrl = result?.download?.url;

    if (!audioUrl) throw '❌ No se encontró una URL de descarga válida.';

    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      fileName: `${videoTitle}.mp3`,
      ptt: false
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    await conn.reply(m.chat, `❌ Error al procesar:\n${e.message || e}`, m);
  }
};

handler.command = ['ytmp3'];
handler.help = ['ytmp3 <texto|link>'];
handler.tags = ['descargas'];

export default handler;
