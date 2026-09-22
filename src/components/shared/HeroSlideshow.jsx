import React, { useEffect, useState } from 'react';

// Slow zoom drifts toward a different corner on each slide so consecutive photos don't move identically.
const ORIGINS = ['50% 50%', '0% 0%', '100% 100%', '100% 0%', '0% 100%'];

function shuffle(items) {
	const result = [...items];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

// Full-bleed crossfading slideshow. Always opens on `first`, then plays the rest in a
// shuffled order, reshuffling after each full pass (never repeating the photo on screen).
// Only the visible photo and the one fading out are mounted; the next is preloaded first.
export default function HeroSlideshow({ first, photos, interval = 10000 }) {
	const [slides, setSlides] = useState([{ src: first, id: 0 }]);

	useEffect(() => {
		if (photos.length < 2) return undefined;
		let cancelled = false;
		let timer;
		let queue = [];
		let onScreen = first;
		let id = 0;

		const advance = () => {
			if (queue.length === 0) queue = shuffle(photos.filter((src) => src !== onScreen));
			const next = queue.shift();

			const img = new Image();
			img.src = next;
			img.decode()
				.catch(() => {})
				.then(() => {
					if (cancelled) return;
					onScreen = next;
					id += 1;
					// Keep the outgoing slide underneath so the new one fades in over it.
					setSlides((current) => [...current.slice(-1), { src: next, id }]);
					timer = setTimeout(advance, interval);
				});
		};

		timer = setTimeout(advance, interval);
		return () => {
			cancelled = true;
			clearTimeout(timer);
		};
	}, [first, photos, interval]);

	return (
		<div className="hero-slideshow">
			{slides.map((slide) => (
				<img
					key={slide.id}
					className={'home-hero-image' + (slide.id === 0 ? ' is-first' : '')}
					style={{ transformOrigin: ORIGINS[slide.id % ORIGINS.length] }}
					src={slide.src}
					alt=""
				/>
			))}
		</div>
	);
}
