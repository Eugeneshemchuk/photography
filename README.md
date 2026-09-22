# Eugene Shemchuk — Photography Portfolio

Recovered and rebuilt from the original Create React App site (`eugeneshemchuk.github.io`),
which only ever shipped as a compiled build with no source. See
`../PHOTO_PORTFOLIO_RECOVERY_BRIEF.md` for how the source and images were recovered from
webpack source maps and the live repo.

## Stack

- Vite + React 18 + `react-router-dom` v7
- `react-photo-gallery` (masonry grid) + `yet-another-react-lightbox` (replaces the original,
  unmaintained `react-images`)
- Sass, `Hanken Grotesk` (Google Fonts) — free open-source release of HK Grotesk, matched from
  the designer's Sketch typography spec
- `vite-plugin-image-optimizer` recompresses all photos at build time (the recovered
  originals are straight-off-camera exports, several MB each)

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL. `npm run build` produces a production build in `dist/`;
`npm run preview` serves that build locally.

## Regenerating the image manifest

If you add/remove/replace photos under `src/assets/images/`, re-run:

```bash
node scripts/generate-image-manifest.mjs
```

This computes each photo's real pixel dimensions (used for the masonry grid layout) and
writes `src/data/imageManifest.json`. Album membership and cover photos are configured in
`src/data/categories.js` — new albums are just a new folder under `src/assets/images/` plus
one entry in that file.

## Moving the deployed path later

The site defaults to being served at the domain root (`/`). To move it (e.g. to
`eugeneshemchuk.github.io/photography`), set `VITE_BASE_PATH=/photography/` in the
environment before building — this is the only change needed:

```bash
VITE_BASE_PATH=/photography/ npm run build
```

Both `vite.config.js` (asset base) and `src/components/App.jsx` (router basename) read the
same variable, so nothing else needs touching.

## Deploying

The current live repo (`Eugeneshemchuk/eugeneshemchuk.github.io`) only has a `master` branch
serving compiled build output from its root — there's no source there today. Two ways to set
up deployment for this rebuilt version, from the original recovery brief:

1. **Manual**: keep this source elsewhere (or on a `source`/`main` branch), run `npm run
   build`, and copy `dist/`'s contents into `master` before each push. Simplest, no CI, but a
   manual step every time.
2. **GitHub Actions**: add a workflow that runs `npm run build` on push and deploys `dist/` to
   `master` (or a dedicated Pages deploy target) automatically. More setup once, no manual
   copying after.

Neither is set up yet — this repo has not been pushed anywhere. Decide which fits your
workflow, and note it changes how you'll make future edits (edit React source vs. edit the
built HTML directly).

## Known judgment calls made during the rebuild

See the chat/report this was built from for the full list — briefly: `EXPERIMANTAL/` (source
frames for the existing Experimental album) and `ME/` (1 photo) were left out of the new
albums; the "My fist experiments" typo in About was corrected to "first"; the homescreen now
opens with a full-bleed hero photo (`DSCF4274.jpg`) per the designer's Sketch mockup, revealing
the album grid on scroll, which the original shipped site never implemented.
