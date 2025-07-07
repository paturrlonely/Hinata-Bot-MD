import { exec } from 'child_process';
import util from 'util';
const execPromise = util.promisify(exec);

const REPO_URL = 'https://github.com/TOKIO5025/Hinata-Bot-MD.git';
const REPO_BRANCH = 'main';

let handler = async (m) => {
  const allowedUser = '50248019799';
  if (m.sender.split('@')[0] !== allowedUser) {
    return m.reply('❌ Este comando solo está disponible para mi creadora suprema 💖.');
  }

  try {
    await m.reply('🔄 Buscando nuevas actualizaciones del sistema...');

    await execPromise('rm -rf ./tmp-repo');
    await execPromise(`git clone --depth=1 --branch ${REPO_BRANCH} ${REPO_URL} ./tmp-repo`);

    const { stdout: diffOutput } = await execPromise(`diff -qr ./tmp-repo ./ | grep -vE ".git|node_modules" || true`);

    // Si no hay cambios, avisar
    if (!diffOutput.trim()) {
      await execPromise('rm -rf ./tmp-repo');
      return m.reply('✅ El bot ya está actualizado. No se encontraron cambios.');
    }

    // Copiar archivos nuevos/modificados
    await execPromise('cp -ru ./tmp-repo/* ./');
    await execPromise('rm -rf ./tmp-repo');

    // Ignorar carpetas y archivos basura
    const ignorar = ['hinata-SubBots', '.cache', '.npm', 'Thumbs.db', 'tmp-repo'];

    const cambiosFiltrados = diffOutput
      .split('\n')
      .filter(line => line.trim() && !ignorar.some(x => line.includes(x)))
      .map(line => {
        if (line.startsWith('Files')) {
          const partes = line.split(' and ');
          const archivo = partes[0].replace('Files ', '').trim().replace('./tmp-repo/', '');
          return `📄 Modificado: ${archivo}`;
        } else if (line.startsWith('Only in')) {
          const match = line.match(/Only in\s+(.+?):\s+(.+)/);
          if (match) {
            const archivo = match[2].trim();
            return `🆕 Agregado: ${archivo}`;
          }
        }
        return null;
      })
      .filter(Boolean);

    // Si después del filtro no queda nada, decir que no hay cambios
    if (!cambiosFiltrados.length) {
      return m.reply('✅ El bot ya está actualizado. No se encontraron cambios relevantes.');
    }

    // Mostrar resultado
    const resumen = cambiosFiltrados.join('\n');
    await m.reply(`✅ *Actualización completada*\n\n📋 *Cambios detectados:*\n${resumen}`);

  } catch (e) {
    console.error(e);
    await m.reply('❌ *Error durante la actualización:*\n' + (e.message || e));
  }
};

handler.help = ['update'];
handler.tags = ['tools'];
handler.command = /^update$/i;

export default handler;
