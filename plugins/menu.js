let handler = async (m, { conn }) => {
    try {
        const botName = 'Hinata-Bot';
        const currency = '¥';
        const videoUrl = 'https://o.uguu.se/OPPikcEx.mp4';
        const vs = '1.0.0';
        const dev = 'NeoTokyo Beats';
        const copy = '🔧 Sistema personalizado';

        const menuMessage = `
╔══🎀══════════════════╗
🌟  𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨 𝐚 ${botName}      
╚══🎀══════════════════╝
🧠 ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏ ᴘᴏʀ: 👨🏻‍💻 ${dev}
📦 𝙑𝙚𝙧𝙨𝙞ó𝙣: ${vs}
💴 𝙈𝙤𝙣𝙚𝙙𝙖: ${currency}

✨ Explora el menú y sígueme para más actualizaciones.
`;

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: menuMessage,
            footer: 'Haz clic para ir al canal oficial 📢',
            buttons: [
                {
                    index: 0,
                    urlButton: {
                        displayText: '📣 Canal de Hinata-Bot',
                        url: 'https://whatsapp.com/channel/0029VbAGXxu1SWsvVgqDAB2R' // <-- tu enlace real aquí
                    }
                }
            ],
            mentions: [m.sender]
        });
    } catch (error) {
        conn.reply(m.chat, `❌ Error al mostrar el menú: ${error.message}`, m);
    }
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'help'];

export default handler;
