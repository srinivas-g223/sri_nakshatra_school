# Sri Nakshatra School - single page website

Easiest way: double-click `index.html` (opens in any browser, no setup).

Local server (optional): install Node.js, then in this folder run
    npm run dev
and open the address shown (http://localhost:5173).

Hosting: upload `index.html` and the `assets` folder to any web host.

Vercel: use the repository root as the project root, leave the framework preset as Other, and use `npm run build` as the build command. The `vercel.json` output directory publishes the built static site and its assets.

Files
- index.html        page content
- build.js          copies the site into the Vercel output directory
- assets/css        styles
- assets/js         animations, gallery, form
- assets/images     photos (replace with original high quality photos, same file names)
- overview/         full-page screenshots (desktop and mobile)
