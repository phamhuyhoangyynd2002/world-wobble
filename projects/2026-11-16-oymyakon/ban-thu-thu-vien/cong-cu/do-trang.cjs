const p = require(process.env.PUP); const { pathToFileURL } = require('url');
(async () => {
  const b = await p.launch({ executablePath: process.env.CH, args: ['--allow-file-access-from-files'] });
  const pg = await b.newPage();
  pg.on('pageerror', e => console.log('pageerror:', e.message));
  await pg.goto(pathToFileURL(process.argv[2]).href); await new Promise(r => setTimeout(r, 1500));
  console.log(await pg.evaluate(async () => {
    const r = { T2: !!window.T2, gsap: typeof gsap, svgKids: document.querySelectorAll('#stage *').length, ready: document.readyState };
    try { await Promise.race([document.fonts.load('800 40px "Fraunces"'), new Promise((_, j) => setTimeout(() => j('timeout'), 2000))]); r.font = 'ok'; } catch (e) { r.font = String(e); }
    try { await Promise.race([window.T2.ready, new Promise((_, j) => setTimeout(() => j('timeout'), 2000))]); r.readyP = 'ok'; } catch (e) { r.readyP = String(e); }
    return JSON.stringify(r);
  }));
  await b.close();
})();
