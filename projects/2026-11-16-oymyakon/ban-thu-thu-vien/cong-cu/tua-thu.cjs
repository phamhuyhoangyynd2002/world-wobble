// Mở index.html trong Chrome không giao diện, tua timeline và in transform của một phần tử (gỡ lỗi seek).
const p = require(process.env.PUP);
const { pathToFileURL } = require('url');
(async () => {
  const b = await p.launch({ executablePath: process.env.CH, args: ['--allow-file-access-from-files'] });
  const pg = await b.newPage();
  pg.on('console', m => console.log('console:', m.text()));
  pg.on('pageerror', e => console.log('pageerror:', e.message));
  await pg.goto(pathToFileURL(process.argv[2]).href);
  await new Promise(r => setTimeout(r, 1500));
  console.log(await pg.evaluate((id) => {
    const tl = window.__timelines && window.__timelines[id];
    if (!tl) return 'no tl: ' + Object.keys(window.__timelines || {});
    const fishG = [...document.querySelectorAll('#stage g[transform]')].find(g => /rotate/.test(g.getAttribute('transform')) && /translate\(/.test(g.getAttribute('transform')));
    const f = () => fishG && fishG.getAttribute('transform');
    const out = ['dur=' + tl.duration(), f()];
    tl.seek(2, false); out.push(f());
    tl.seek(5, true); out.push(f());
    tl.totalTime(1); out.push(f());
    return out.join('\n');
  }, process.argv[3]));
  await b.close();
})();
