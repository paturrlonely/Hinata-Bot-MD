import fs from 'fs';
const path = './src/JSON/db_nsfw.json';

function cargarDB() {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({ grupos: [] }, null, 2));
  return JSON.parse(fs.readFileSync(path));
}

function guardarDB(db) {
  fs.writeFileSync(path, JSON.stringify(db, null, 2));
}

const handler = async (m, { conn, args, isGroup, isAdmin, isBotAdmin, command }) => {
  if (!isGroup) return m.reply('❌ Este comando solo se puede usar en grupos.');

  if (!isAdmin) return m.reply('❌ Solo los admins pueden usar este comando.');
  if (!isBotAdmin) return m.reply('❌ Necesito ser admin para activar o desactivar funciones.');

  const db = cargarDB();

  let grupoID = m.chat;

  if (/^(enable|on)$/i.test(command)) {
    if (db.grupos.includes(grupoID)) return m.reply('✅ El modo NSFW ya está *activado* en este grupo.');
    db.grupos.push(grupoID);
    guardarDB(db);
    m.reply('✅ Modo NSFW *activado* en este grupo.');
  }

  if (/^(disable|off)$/i.test(command)) {
    if (!db.grupos.includes(grupoID)) return m.reply('❌ El modo NSFW ya está *desactivado* en este grupo.');
    db.grupos = db.grupos.filter(id => id !== grupoID);
    guardarDB(db);
    m.reply('🚫 Modo NSFW *desactivado* en este grupo.');
  }
};

handler.command = /^(enable|disable|ativar|of)$/i;
handler.tags = ['group', 'admin'];
handler.help = ['enable nsfw', 'disable nsfw'];

export default handler;
