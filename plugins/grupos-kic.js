import moment from 'moment-timezone';

let handler = async (m, { conn, args, text }) => {
  // Verificar si hay un usuario mencionado
  let user = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!user) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key }});
    return conn.reply(m.chat, '👤 *Etiqueta o responde al mensaje de quien quieres eliminar.*', m);
  }

  // Buscar hora y periodo
  let match = text.match(/(\d{1,2}):(\d{2})\s*(de la)?\s*(mañana|tarde|noche)/i);
  if (!match) {
    return conn.reply(m.chat, '📌 *Hora inválida.* Usa formato como:\n.kick 4:30 de la tarde @usuario', m);
  }

  let [_, horaStr, minutoStr, _, periodo] = match;
  let hora = parseInt(horaStr);
  let minuto = parseInt(minutoStr);

  // Convertir a 24 horas
  if (periodo.toLowerCase() === 'tarde' && hora < 12) hora += 12;
  if (periodo.toLowerCase() === 'noche' && hora < 12) hora += 12;
  if (periodo.toLowerCase() === 'mañana' && hora === 12) hora = 0;

  let ahora = moment().tz('America/Guatemala');
  let ejecutar = ahora.clone().hour(hora).minute(minuto).second(0);
  if (ejecutar.isBefore(ahora)) ejecutar.add(1, 'day');

  let delay = ejecutar.diff(ahora);

  await conn.sendMessage(m.chat, { react: { text: '⏰', key: m.key }});
  await conn.reply(m.chat, `✅ *${conn.getName(user)} será eliminado a las ${ejecutar.format("hh:mm A")}.*`, m);

  // Programar eliminación
  setTimeout(async () => {
    try {
      await conn.sendMessage(m.chat, {
        audio: { url: 'https://qu.ax/ygCsB.mp4' },
        mimetype: 'audio/mp4',
        ptt: true
      });
      await new Promise(res => setTimeout(res, 1000));
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    } catch (e) {
      console.error('❌ Error al ejecutar el kick:', e);
      await conn.reply(m.chat, '⚠️ *No pude eliminar al usuario. Puede que ya no esté en el grupo o no tengo permisos.*', m);
    }
  }, delay);
};

handler.help = ['kik <hora> @usuario'];
handler.tags = ['grupo'];
handler.command = ['kik'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
