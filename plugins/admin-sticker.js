let handler = async (m, { conn, usedPrefix, command, args }) => {
    const chat = global.db.data.chats[m.chat] || {};
    const setting = args[0]?.toLowerCase();

    if (!m.isGroup) throw `❌ Este comando solo se puede usar en grupos.`;
    if (!setting) throw `✳️ Usa: *${usedPrefix + command} antisticker*`;

    if (setting !== 'antisticker') {
        throw `⚠️ Configuración no válida.\n\nSolo puedes usar: *antisticker*`;
    }

    const action = command === 'activar';
    chat.antisticker = action;
    global.db.data.chats[m.chat] = chat;

    m.reply(`✅ El sistema *antisticker* ha sido ${action ? 'activado' : 'desactivado'} correctamente.`);
};

handler.help = ['activar antisticker', 'desactivar antisticker'];
handler.tags = ['group', 'config'];
handler.command = ['activar', 'desactivar'];
handler.admin = true;
handler.group = true;

export default handler;