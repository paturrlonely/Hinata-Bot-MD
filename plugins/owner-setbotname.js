import fs from 'fs';

const filePath = './personalize.json';

let handler = async (m, { conn, text }) => {
  // Reaccionar con 💫 cuando empieza
  await conn.sendMessage(m.chat, { react: { text: '💫', key: m.key } });

  if (!text) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    return m.reply('✨ Onii-chan, porfa dime qué nombre quieres para mí~ 💖');
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath));
  } catch {
    data = {};
  }

  if (!data.global) data.global = { botName: null, currency: null, videos: [] };

  data.global.botName = text.trim();

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key } });
  m.reply(`🌟 ¡Listo, mi querido amigo! Ahora me llamaré *${text.trim()}* para siempre 💕`);
};

handler.help = ['cambiarnombreBot <nuevo nombre>', 'nombrebot <nuevo nombre>'];
handler.tags = ['config'];
handler.command = /^(cambiarnombreBot|nombrebot)$/i;
handler.owner = true; // Solo el owner puede usarlo

export default handler;