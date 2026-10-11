# BR NXTGEN website

Run locally: `npm start` then open http://localhost:3000 (no dependencies).

Deploy: upload the `public` folder to Netlify/Cloudflare Pages (the `_headers` file sets security headers), or deploy the whole folder to Vercel (`vercel.json`), or run `node server.js` behind HTTPS.

Photos: replace `public/assets/team/*.svg` with real photos (same name, .jpg then edit the filename in gen.py or about.html). Hero photo: add `public/assets/hero.jpg`.
