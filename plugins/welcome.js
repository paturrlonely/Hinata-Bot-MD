import { createCanvas, loadImage } from 'canvas';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { WAMessageStubType } from '@whiskeysockets/baileys';

// Imagen de fondo (puede ser la que me pasaste)
const fondoBienvenida = 'https://n.uguu.se/XspcTNNM.jpg';

export async function before(m, { conn, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return;

  const user = m.messageStubParameters?.[0];
  if (!user) return;
  const usuario = `@${user.split('@')[0]}`;

  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const base = await loadImage(fondoBienvenida);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(base, 0, 0);

    // Estilo de texto
    ctx.font = 'bold 38px Sans';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 8;
    ctx.textAlign = 'center';

    // Texto en medio de la imagen
    ctx.fillText(`¡Bienvenido ${usuario}!`, canvas.width / 2, canvas.height - 50);

    // Guardar la imagen temporal
    const outputPath = join(tmpdir(), `${Date.now()}_bienvenida.jpg`);
    writeFileSync(outputPath, canvas.toBuffer());

    // Enviar imagen generada con texto personalizado
    await conn.sendMessage(m.chat, {
      image: { url: outputPath },
      caption: `🎉 ¡Disfruta el grupo ${usuario}!`,
      mentions: [user]
    });
  }
}
