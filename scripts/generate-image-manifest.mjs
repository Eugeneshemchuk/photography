// Scans src/assets/images and writes src/data/imageManifest.json mapping
// each recovered photo's path (relative to src/) to its real pixel dimensions.
// Replaces the original site's fragile "{slug}-{name}-{W}x{H}.ext" filename
// parsing, which only worked for files in category_1 and silently dropped
// any image that didn't follow the convention.
import { readdir, writeFile, readFile } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { imageSize } from 'image-size';

const IMAGES_ROOT = fileURLToPath(new URL('../src/assets/images', import.meta.url));
const SRC_ROOT = fileURLToPath(new URL('../src', import.meta.url));
const OUT_FILE = fileURLToPath(new URL('../src/data/imageManifest.json', import.meta.url));

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif']);

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			await walk(full, files);
		} else if (IMAGE_EXT.has(extname(entry.name).toLowerCase())) {
			files.push(full);
		}
	}
	return files;
}

const files = await walk(IMAGES_ROOT);
const manifest = {};

for (const file of files) {
	const buffer = await readFile(file);
	const { width, height } = imageSize(buffer);
	const key = '/' + relative(SRC_ROOT, file).split('\\').join('/');
	manifest[key] = { width, height };
}

await writeFile(OUT_FILE, JSON.stringify(manifest, null, '\t') + '\n');
console.log(`Wrote ${Object.keys(manifest).length} entries to ${OUT_FILE}`);
