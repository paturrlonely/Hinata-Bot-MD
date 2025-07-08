import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('🎩');

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let username = await conn.getName(m.sender);

    // Vcard info
    let list = [{
        displayName: "🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲",
        vcard: `BEGIN:VCARD
VERSION:3.0
FN:🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
item1.TEL;waid=YOUR_NUMBER:YOUR_NUMBER
item1.X-ABLabel:Número
item2.EMAIL;type=INTERNET:youremail@example.com
item2.X-ABLabel:Email
item3.URL:https://tucanal.com
item3.X-ABLabel:Canal
item4.ADR:;;Tu Ciudad;;;;
item4.X-ABLabel:Región
END:VCARD`,
    }];

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: '✨ Contacta a mi creador, el mejor ✨',
                body: '🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲',
                thumbnailUrl: 'https://cdnmega.vercel.app/media/c4hhgZgD@fGOHhRAM1CD-3_cpAQk-Q86yQnQLGHYKZ1M0P_heI9s',
                sourceUrl: 'https://tucanal.com',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

    let txt = `👋 Hola, *${username}* ✨\n\nEste es el contacto de mi creador: *🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲*.\nSi quieres contactarlo, aquí tienes su info 💖`;

    let buttons = [
        { buttonId: `#followchannel`, buttonText: { displayText: '🌟 Seguir mi canal' }, type: 1 },
        { buttonId: 'close', buttonText: { displayText: '❌ Cerrar' }, type: 1 }
    ];

    await conn.sendMessage(m.chat, {
        text: txt,
        footer: '🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲',
        buttons: buttons,
        headerType: 1
    }, { quoted: m });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
