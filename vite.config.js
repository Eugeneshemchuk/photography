import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// base defaults to '/' (served at the domain root, as today).
// To move the deployed site later (e.g. to eugeneshemchuk.github.io/photography),
// set VITE_BASE_PATH=/photography/ in the environment (or a .env file) before
// building — this is the only change needed, no component code references the
// base path directly (see src/components/App.jsx, which reads the same var
// for the router's basename).
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		base: env.VITE_BASE_PATH || '/',
		plugins: [
			react(),
			// Source photos are straight-off-camera exports (up to ~16MP, several MB
			// each). Recompress at build time so the site is actually loadable —
			// this only changes file size, aspect ratios (and the image manifest's
			// recorded dimensions) are unaffected.
			ViteImageOptimizer({
				jpg: { quality: 75 },
				jpeg: { quality: 75 },
				png: { quality: 75 },
			}),
		],
	};
});
