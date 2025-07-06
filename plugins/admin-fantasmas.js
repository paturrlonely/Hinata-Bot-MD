// 💖 Comandos .fantasmas y .kickfantasmas – Hinata Bot 💋
// 🛠️ Creado por TOKIO5025 – github.com/TOKIO5025

let handler = async (m, { conn, participants, isAdmin, isBotAdmin, command }) => {
  if (!m.isGroup) throw '🌸 Este comando solo funciona en grupos, tontito~ 💞';

  const mensajes = global.db.data?.messages || {};
  const miembros = participants.map(p => p.id).filter(id => id !== conn.user.jid);
  const activos = miembros.filter(id => mensajes[m.chat] && mensajes[m.chat][id]);
  const fantasmas = miembros.filter(id => !activos.includes(id));

  // 📌 SI NO ES ADMIN
  if (!isAdmin) {
    await conn.sendMessage(m.chat, { react: { text: '😝', key: m.key }});
    return conn.reply(m.chat, `╭─💋 *Hinata-chan dice...* 💋─➤
│
│  🥺 Unichan... este comando es solo
│  para mis bellos *administradores* 💖
│
│  Anda, quédate aquí y mírame mimarte~ 😚
╰─────────────🌸`, m);
  }

  // 📌 SI ES .fantasmas
  if (command === 'fantasmas') {
    await conn.sendMessage(m.chat, { react: { text: '👻', key: m.key }});

    if (fantasmas.length === 0) {
      return m.reply(`╭─🌟 *Hinata Bot* 🌟─➤
│
│  UwU~ ¡Todos han hablado! 💕
│  Qué grupo tan activo y lindo~ ✨
╰─────────────🌸`);
    }

    let texto = `╭──🌙 *Fantasmitas Detectados* 👻\n│\n│  Awww... estos unis no han dicho nada~ 🥺\n│  ¿Les doy un abracito para que hablen? 😳💗\n│\n`;

    for (let user of fantasmas) {
      texto += `│  ✦ @${user.split('@')[0]}\n`;
    }

    texto += `│\n╰─✨ Total: *${fantasmas.length}* fantasmitas calladitos~ 💫`;

    return conn.sendMessage(m.chat, { text: texto, mentions: fantasmas }, { quoted: m });
  }

  // 📌 SI ES .kickfantasmas
  if (command === 'kickfantasmas') {
    if (!isBotAdmin) {
      return m.reply('🙁 Hinata no puede sacar a nadie si no soy admin del grupo, uniii~ 😢');
    }

    await conn.sendMessage(m.chat, { react: { text: '💘', key: m.key }});

    if (fantasmas.length === 0) {
      return m.reply(`╭─🌟 *Hinata Bot* 🌟─➤
│
│  Todos han hablado 🥰
│  ¡No hay fantasmitas para sacar~! ✨
╰─────────────🌸`);
    }

    await conn.reply(m.chat, `╭──💘 *Hinata-chan en modo traviesa* 💘\n│\n│  Bye bye fantasmitas~ 😚\n│  Los saco con amor porque no hablan uwu~\n│\n╰─✨ Total a eliminar: *${fantasmas.length}*`, m);

    for (let id of fantasmas) {
      try {
        await conn.groupParticipantsUpdate(m.chat, [id], 'remove');
        await new Promise(resolve => setTimeout(resolve, 1500)); // anti-baneo
      } catch (e) {
        await m.reply(`❌ No pude sacar a @${id.split('@')[0]}... creo que tiene protección divina 💔`, null, {
          mentions: [id]
        });
      }
    }
  }
};

handler.command = /^fantasmas|kickfantasmas$/i;
handler.group = true;

export default handler;
