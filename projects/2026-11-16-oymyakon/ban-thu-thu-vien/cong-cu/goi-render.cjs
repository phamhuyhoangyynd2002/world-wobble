const p = require(process.env.PUP); const { pathToFileURL } = require('url');
(async () => {
  const b = await p.launch({ executablePath: process.env.CH, args: ['--allow-file-access-from-files'] });
  const pg = await b.newPage();
  pg.on('console', m => console.log('console:', m.text()));
  pg.on('pageerror', e => console.log('pageerror:', e.message));
  await pg.evaluateOnNewDocument(() => { window.addEventListener('unhandledrejection', e => console.log('unhandled: ' + (e.reason && e.reason.stack || e.reason))); });
  await pg.goto(pathToFileURL(process.argv[2]).href); await new Promise(r => setTimeout(r, 2500));
  console.log(await pg.evaluate(() => JSON.stringify(Object.keys(window.__timelines || {}))));
  await b.close();
})();
