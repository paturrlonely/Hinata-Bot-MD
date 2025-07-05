import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {}

handler.customPrefix = /.+/
handler.command = new RegExp

handler.all = async function ({ conn, m }) {
  if (!m.isGroup) return
  const groupMetadata = await conn.groupMetadata(m.chat)
  const participants = m.participants || []

  const hinataImage = 'https://d.uguu.se/canPsoUp.jpg'

  for (let user of participants) {
    try {
      let name = (await conn.getName(user)) || user.split('@')[0]

      if (m.action === 'add') {
        let text = `╔═══🌸 𝐇𝐢𝐧𝐚𝐭𝐚 𝐁𝐨𝐭 𝐬𝐞 𝐦𝐚𝐧𝐢𝐟𝐢𝐞𝐬𝐭𝐚 🌸═══╗

✨ Hola hola, @${user.split('@')[0]}~  
💕 Bienvenido/a a *${groupMetadata.subject}*

🍡 Soy *Hinata Bot* y estoy feliz de tenerte aquí~  
Disfruta tu estancia, ne~ 🥰

🖼 Imagen mágica ➤ ${hinataImage}

╚════════════════════╝`

        await conn.sendMessage(m.chat, {
          image: { url: hinataImage },
          caption: text,
          mentions: [user]
        })

      } else if (m.action === 'remove') {
        let text = `╔═══💢 𝐇𝐢𝐧𝐚𝐭𝐚 𝐁𝐨𝐭 𝐬𝐞 𝐜𝐚𝐛𝐫𝐞𝐚 💢═══╗

🚪 @${user.split('@')[0]} se largó de *${groupMetadata.subject}*...

🗣 ¡¿Y a quién ch*ngados le importa?!  
💩 Nadie te va a extrañar, pinche ridícul@.

👉 No regreses, que nadie te llamó 😒

🖼 Imagen de desprecio ➤ ${hinataImage}

╚════════════════════╝`

        await conn.sendMessage(m.chat, {
          image: { url: hinataImage },
          caption: text,
          mentions: [user]
        })
      }
    } catch (e) {
      console.error('❌ Error en welcome/despedida:', e)
    }
  }
}

export default handler
