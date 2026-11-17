<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>T2 – canh 1 ban ky vat</title>
    <script src="_shared/vendor/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Fraunces"; src: url("_shared/fonts/Fraunces-Variable.ttf") format("truetype"); font-weight: 100 900; font-style: normal; }
      html, body { width: 1920px; height: 1080px; margin: 0; background: #1E2A2B; }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; }
      .layer { position: absolute; inset: 0; }
      svg { display: block; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="t2" data-start="0" data-duration="12.6" data-width="1920" data-height="1080">
      <div id="stage" class="clip layer" data-start="0" data-duration="12.6" data-track-index="0"></div>
    </div>
    <script id="t2-data" type="application/json">/*DATA*/</script>
    <script src="canh.js"></script>
    <script>
      window.T2.ready.then(function (r) {
        window.__timelines = window.__timelines || {};
        window.__timelines["t2"] = r.tl;
      });
    </script>
  </body>
</html>
