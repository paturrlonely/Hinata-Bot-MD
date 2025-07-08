import { join } from 'path';
import { existsSync } from 'fs';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`🌸 𝙐𝙨𝙤 𝙘𝙤𝙧𝙧𝙚𝙘𝙩𝙤:\n*${usedPrefix + command} <código>*\n\n📌 Ejemplo:\n*${usedPrefix + command} 84937264*\n\n💡 Este comando es solo para *usuarios Premium* que recibieron un código único para convertirse en Sub-Bot.`);
  }

  let code = args[0].trim();

  if (!/^\d{6,10}$/.test(code)) {
    return m.reply('❌ *El código debe tener entre 6 y 10 dígitos numéricos.*');
  }

  let path = './jadibts/';
  let file = join(path, `${code}.json`);

  if (!existsSync(file)) {
    return m.reply('🚫 *El código ingresado no existe o ya fue usado.*\n\n🧚🏻‍♀️ Asegúrate de escribirlo correctamente.');
  }

  m.reply('💖 *Conectando como Sub-Bot...*\n⏳ Espérame un momentito, mi cielo~');

  try {
    let auth = require(file);
    let { create } = await import('../lib/jadibot.js'); // asegúrate de tener este módulo
    create(auth, conn, m);
  } catch (e) {
    console.error(e);
    return m.reply('💥 *Ocurrió un error al iniciar el Sub-Bot.*\nIntenta más tarde o habla con el creador.');
  }
};

handler.help = ['code-premium <código>'];
handler.tags = ['jadibot'];
handler.command = /^code-premium$/i;

export default handler;
