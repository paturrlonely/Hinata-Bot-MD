import fs from 'fs';

const filePath = './personalize.json';

let handler = async (m, { conn }) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));

        // Cargar datos globales y predeterminados
        const globalConfig = data.global;
        const defaultConfig = data.default;

        const botName = globalConfig.botName || defaultConfig.botName;
        const currency = globalConfig.currency || defaultConfig.currency;
        const videos = globalConfig.videos.length > 0 ? globalConfig.videos : defaultConfig.videos;

        const randomVideoUrl = videos[Math.floor(Math.random() * videos.length)];

        const menuMessage = `
╔══🎀══════════════════╗
🌟  𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨 𝐚 ${botName}      
╚══🎀══════════════════╝
🧠 ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴏ ᴘᴏʀ: 👨🏻‍💻 ${dev}
📦 𝙑𝙚𝙧𝙨𝙞ó𝙣: ${vs}
💻 Hinata-Bot - 𝙀𝙡 𝙢𝙚𝙟𝙤𝙧 𝘽𝙤𝙩 𝙙𝙚𝙡 𝙢𝙪𝙣𝙙𝙤

┏━━༺💬༻━━┓
┃ ¡Hola! Soy *${botName}* 🩵
┃ Aquí tienes la lista de comandos
┗━━༺💬༻━━┛

💴 𝙈𝙤𝙣𝙚𝙙𝙖 𝙖𝙘𝙩𝙪𝙖𝙡: ¥ ${currency}
📢 Más información y novedades:
🔗 https://whatsapp.com/channel/0029Vaqe1Iv65yDAKBYr6z0A

 ╔═══❖🌟❖═══╗
┃  👑 𝙎𝙊𝙇𝙊 𝘾𝙍𝙀𝘼𝘿𝙊𝙍 
╚═══❖🌟❖═══╝
✿ .cambiarnombreBot ✏️  — Cambia el nombre del bot  
✿ .setbanner 🖼️ — Establece un banner
✿ .setmoneda 🪙 — Cambia la moneda global
✿ .viewbanner 📄 — Ver banner actual
✿ .deletebanner 🗑️ — Eliminar banner
✿ .resetpreferences ♻️ — Reiniciar preferencias

╔═══❖🌙❖═══╗
┃  🗂️ 𝙈𝙀𝙉𝙐 𝘿𝙀𝙎𝘾𝙐𝙀𝙉𝙏𝙊
╚═══❖🌙❖═══╝
☘ .menu2  — Comandos especiales

╔═══🌙≪ 𝘼𝘿𝙈𝙄𝙉𝙄𝙎𝙏𝙍𝘼𝘾𝙄𝙊𝙉 ≫🌙═══╗
┃ 🛡️ Comandos exclusivos para admins
┃ ✦ .kick 🚫 — Expulsar usuario
┃ ✦ .getplugin 🔌 — Obtener plugin
┃ ✦ .getpack 📦 — Descargar pack
┃ ✦ .store 🏪 — Ver tienda
┃ ✦ .status 🖥️ — Estado actual
┃ ✦ .ping 📍 — Latencia del bot
┃ ✦ .gemini 🔍 — Buscar con Gemini
┃ ✦ .pinterest ✨ — Imagen random
╚════════════════════════════╝
╭─❖ 🌌 *Descargas de IA* 🌌 ❖─╮
│ 🔹 *.pollinations* – Generador IA de imágenes
╰────────────────────────────╯

╔═══🎲≪ 𝙍𝘼𝙉𝘿𝙊𝙈 ≫🎲═══╗
┃ 🎲 Comandos aleatorios y waifus
┃ ❖ .rw 🌟 — Random waifu
┃ ❖ .winfo 🧸 — Info de waifu
┃ ❖ .rollwaifu 🧸 — Tirar waifu
┃ ❖ .claim 💡 — Reclamar waifu
┃ ❖ .harem 💗 — Ver tu harem
┃ ❖ .addrw 📝 — Añadir waifu
┃ ❖ .alya ➩ .bot 🤖 — Charla con Alya
┃ ❖ .kaori ❤️ — Momento musical 🎻
┃ ❖ .waifu 👄 — Imagen de waifu
┃ ❖ .fakengl ⚡ — Nombre fake en inglés
╚═══════════════════════════╝

╔═══🔄≪ 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙎 ≫🔄═══╗
┃ 📥 Descarga tu contenido favorito
┃ ✧ .playaudio ➩ (audio) 🎶
┃ ✧ .ytmp4 ➩ (video) 🎬
┃ ✧ .tt ➩ .tiktok ➩ TikTok 🎞️
┃ ✧ .tiktokmp3   descarga audio🎵de tiktok
┃ ✧ .sp ➩ .spotify ➩ Spotify 🎧
┃ ✧ .tksearch 
┃ ✧ .tourl .tourl2
┃ ✧ .tourl3 .upload
┃ ✧ .mediafire
┃ ✧ .stickerly
╚═══════════════════════════╝

╔═══🎰≪ 𝙀𝘾𝙊𝙉𝙊𝙈𝙄𝘼 ≫🎰═══╗
┃ 💰 Gana, roba y gestiona tu dinero
┃ ❖ .work 👷🏻‍♂️ — Trabaja y gana ¥
┃ ❖ .slut 😈 — Riesgo... o recompensa
┃ ❖ .robar 👨🏻‍💻 — Roba a otro jugador
┃ ❖ .deposit (¥) 🏦 — Deposita al banco
┃ ❖ .retirar (¥) 🏧 — Retira del banco
┃ ❖ .transferir (¥) @user 📨 — Envía dinero
┃ ❖ .perfil 🆔 — Ver tu economía
╚════════════════════════════╝

╔═══⛩️≪ 𝙍𝙀𝘼𝘾𝘾𝙄𝙊𝙉𝙀𝙎 𝘼𝙉𝙄𝙈𝙀 ≫⛩️═══╗
┃ 🎌 Expresa emociones al estilo anime
┃ ♡ .abrazar 🫂 — Abrazo kawaii~
┃ ♡ .aburrido 🙇🏻‍♂️ — Me aburro...
┃ ♡ .bañarse 🛀🏻 — Hora del baño~
┃ ♡ .bleh 🤸🏻‍♂️ — ¡Bleh~!
┃ ♡ .comer 🍙 — Comiendo onigiri 🍙
┃ ♡ .dance 💃🕺 — ¡Hora de bailar!
┃ ♡ .enojado 🤦🏻‍♂️ — Estoy molesto
┃ ♡ .feliz 😊 — Sonríe más, senpai~
┃ ♡ .kiss 💋 — Envío un beso 💋
┃ ♡ .love ❤️ — ¡Te amo!
┃ ♡ .matar 🔪 — Hora de acabar contigo...
┃ ♡ .morder 🦷 — Ñam~
┃ ♡ .nalguear 🍑 — ¡Nalgadita!
┃ ♡ .punch 👊 — Golpe directo~
┃ ♡ .saludar 👋 — ¡Yaa~ hola!
┃ ♡ .bofetada 🖐️ — ¡Toma esto!
┃ ♡ .dormir 🛌🏻 — Zzz... durmiendo~
┃ ♡ .smoke 🚬 — Fumando con estilo
┃ ♡ .paja 🍆 — 🔞 [reacción subida de tono]
╚════════════════════════════╝
   
╔═══💥≪ 𝙏𝙊𝙊𝙇𝙎 ≫⛩️═══╗
┃ 🧰 Cosas divertidas y cool
┃ ✦ .ver — Reacciona a una imagen/video/audio de "ver una vez" 👁️‍🗨️
┃ ✦ .get — Descarga estados de WhatsApp 📥
┃ ✦ .subirver — Sube contenido como "ver una vez" 🔁
┃ ✦ .rpf — Roba foto de perfil Del usuario
┃ ✦ .rpf2 — Roba foto de perfil Del usuario y nombre 
╚═════════════════════════╝

╔════ ≪ ✨ ≫ ════╗
│ ✨ 𝙎𝙊𝙇𝙊 𝙊𝙒𝙉𝙀𝙍 ✨ 
│❀ .update ⭕
│❀ .dsowner ➩ .purgar 🗑️
│❀ .join 💎
╚════ ≪ ✨ ≫ ════╝

> ${copy} Hecho con mucho amor por ${dev}
`;

        await conn.sendMessage(
            m.chat,
            {
                video: { url: randomVideoUrl },
                gifPlayback: true,
                caption: menuMessage,
                mentions: [m.sender]
            }
        );
    } catch (error) {
        conn.reply(m.chat, `❌ Error al cargar el menú: ${error.message}`, m);
    }
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'help'];

export default handler;

/* estilos de menu

┎───•✧•───⌬
┃
┖───•✧•  */
