import fetch from 'node-fetch';

let tiktokSessions = new Map();

const tiktokHandler = async (m, { conn, command, args, usedPrefix }) => {
    const query = args.join(' ').trim();

    if (command === 'tksearch') {
        if (!query) return conn.reply(m.chat, `❌ Escribe lo que quieres buscar📽️\n\nEjemplo: *${usedPrefix}tksearch edits de Hinata*`, m);

        // Borrar la sesión anterior y crear una nueva
        const session = { videos: [], currentIndex: 0, query };
        tiktokSessions.set(m.chat, session);

        try {
            const apiUrl = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent(query)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data.meta || !data.meta.length) return conn.reply(m.chat, '❌ No se encontraron videos.', m);

            session.videos = data.meta;
            await sendVideoWithButtons(session, m, conn, usedPrefix);
        } catch (err) {
            console.error(err);
            conn.reply(m.chat, '❌ Error al buscar videos.', m);
        }
    }

    if (command === 'tkseguir') {
        const session = tiktokSessions.get(m.chat);
        if (!session || !session.videos.length) return conn.reply(m.chat, '❌ Primero usa *.tksearch* para buscar videos.', m);

        if (session.currentIndex + 1 >= session.videos.length) return conn.reply(m.chat, '✅ No hay más videos, vuelve a buscar.', m);

        session.currentIndex += 1;
        await sendVideoWithButtons(session, m, conn, usedPrefix);
    }
};

async function sendVideoWithButtons(session, m, conn, usedPrefix) {
    const video = session.videos[session.currentIndex];

    const caption = `🎬 Resultado ${session.currentIndex + 1} de ${session.videos.length}\n🔍 *${session.query}*\n\n✅ Usa el botón para ver más videos.`;

    const buttons = [];

    if (session.currentIndex + 1 < session.videos.length) {
        buttons.push({
            buttonId: `${usedPrefix}tkseguir`,
            buttonText: { displayText: '💥 Siguiente Video🌟' },
            type: 1
        });
    }

    try {
        await conn.sendMessage(
            m.chat,
            {
                video: { url: video.hd },
                caption,
                buttons,
                footer: '🎥 TikTok Search',
                headerType: 5
            },
            { quoted: m }
        );
    } catch (err) {
        console.error(err);
        conn.reply(m.chat, '❌ Error al enviar el video.', m);
    }
}

tiktokHandler.help = ['tksearch <texto>', 'tkseguir'];
tiktokHandler.tags = ['search', 'tiktok'];
tiktokHandler.command = /^(tksearch|tkseguir)$/i;

export default tiktokHandler;
