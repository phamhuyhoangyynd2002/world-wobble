// Mở phong-nen.html?lop=<x> trong Chrome không giao diện (có WebGL), chờ vẽ xong, lưu canvas ra PNG (giữ kênh trong suốt).
const p = require(process.env.PUP); const fs = require('fs'); const { pathToFileURL } = require('url');
(async () => {
  const [file, outDir, ...lops] = process.argv.slice(2);
  const b = await p.launch({ executablePath: process.env.CH, args: ['--allow-file-access-from-files', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  for (const lop of lops) {
    const pg = await b.newPage(); await pg.setViewport({ width: 1920, height: 1080 });
    pg.on('pageerror', e => console.log('pageerror:', e.message)); pg.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
    const t0 = Date.now();
    await pg.goto(pathToFileURL(file).href + '?lop=' + lop);
    await pg.waitForFunction('window.XONG === true', { timeout: 120000 });
    const data = await pg.evaluate(() => document.querySelector('canvas').toDataURL('image/png'));
    fs.writeFileSync(`${outDir}/lop-${lop}.png`, Buffer.from(data.split(',')[1], 'base64'));
    console.log(lop, 'ms', Date.now() - t0); await pg.close();
  }
  await b.close();
})();
