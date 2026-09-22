import { categories } from '../data/categories';
import imageManifest from '../data/imageManifest.json';

// Eagerly load every recovered photo so Vite can hash/optimize them at build time.
// Keys look like '../assets/images/category_1/abstract-DSCF2739-3x4.jpg'.
const imageModules = import.meta.glob('../assets/images/**/*.{jpg,jpeg,png,gif}', {
	eager: true,
	import: 'default',
});

function manifestKey(globKey) {
	// '../assets/images/X.jpg' -> '/assets/images/X.jpg', matching imageManifest.json's keys
	return globKey.replace(/^\.\./, '');
}

function dimensionsFor(globKey) {
	const key = manifestKey(globKey);
	const entry = imageManifest[key];
	if (!entry) {
		throw new Error(`No dimensions recorded for ${key}; re-run scripts/generate-image-manifest.mjs`);
	}
	return entry;
}

function buildPhotos(category) {
	const folderMarker = `/assets/images/${category.folder}/`;
	return Object.entries(imageModules)
		.filter(([globKey]) => {
			if (!manifestKey(globKey).includes(folderMarker)) return false;
			if (!category.prefix) return true;
			const filename = globKey.split('/').pop();
			return filename.startsWith(category.prefix);
		})
		.map(([globKey, src]) => {
			const { width, height } = dimensionsFor(globKey);
			return { src, width, height, filename: globKey.split('/').pop() };
		})
		.sort((a, b) => a.filename.localeCompare(b.filename));
}

export const albums = categories.map((category) => {
	const photos = buildPhotos(category);
	const cover = photos.find((p) => p.filename === category.cover) || photos[0];
	return { ...category, photos, cover };
});

export function getAlbum(slug) {
	return albums.find((album) => album.slug === slug);
}
