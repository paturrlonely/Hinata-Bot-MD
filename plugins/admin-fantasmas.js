// 🌸 Comando Hinata Bot – Inactivos + Kick Fantasmas
// 🔧 Creado por TOKIO5025 – https://github.com/TOKIO5025

let handler = async (m, { conn, participants, groupMetadata, isAdmin, isBotAdmin, command }) => {
  if (!m.isGroup) throw '🌺 Este comando solo funciona en grupos, ¡tontito!~';
  if (!isAdmin) throw '🌸 Solo los *admins guapos* pueden usar este comando 💋';
  if (!isBotAdmin) throw '💢 ¡Hazme admin para poder sacar fantasmas, baka! 😤';

  const group = groupMetadata.id;
  const miembros = participants.map(p => p.id).filter(v => v !== conn.user.jid);
  const chats = await conn.loadMessages(group, 500);
  const activos = new Set(chats.map(chat => chat.key.participant));
  const fantasmas = miembros.filter(id => !activos.has(id));

  if (command === 'inactivos') {
    let texto = `╭─❀「 *👻 Miembros Fantasmas* 」\n`;
    for (let i = 0; i < fantasmas.length; i++) {
      texto += `│ ✦ @${fantasmas[i].split('@')[0]}\n`;
    }
    texto += `╰─✿ Total: *${fantasmas.length}* que no dicen ni *mu~*`;
    return conn.sendMessage(m.chat, { text: texto, mentions: fantasmas }, { quoted: m });
  }

  if (command === 'kickfantasmas') {
    if (fantasmas.length === 0) return m.reply('✨ Todos están activos, ¡qué bonito grupo!~ 💕');

    m.reply(`🔪 Eliminando a ${fantasmas.length} fantasmitas... ¡Bye bye~! 😘`);
    for (let id of fantasmas) {
      try {
        await conn.groupParticipantsUpdate(m.chat, [id], 'remove');
        await new Promise(resolve => setTimeout(resolve, 1500)); // 🛡️ Anti-baneo
      } catch (err) {
        m.reply(`❌ No pude sacar a @${id.split('@')[0]}... quizás es admin 😶`, null, { mentions: [id] });
      }
    }
  }
};

handler.command = /^(inactivos|kickfantasmas)$/i;
handler.group = true;
handler.admin = true;

export default handler;
