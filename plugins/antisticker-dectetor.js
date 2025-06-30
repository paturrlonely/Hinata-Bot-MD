export async function before(m, { conn, isAdmin, isBotAdmin }) {
    const chat = global.db.data.chats[m.chat];

    if (!m.isGroup || !chat?.antisticker) return;

    if (m.mtype === 'stickerMessage') {
        if (!isBotAdmin) return;

        const groupMetadata = await conn.groupMetadata(m.chat);
        const admins = groupMetadata.participants
            .filter(p => p.admin)
            .map(p => p.id);

        if (admins.includes(m.sender)) return;

        // Mensaje antes de eliminar
        await conn.sendMessage(m.chat, {
            text: `🚫 *Sticker prohibido*\n@${m.sender.split("@")[0]} será eliminado por romper las reglas.`,
            mentions: [m.sender]
        });

        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }
}