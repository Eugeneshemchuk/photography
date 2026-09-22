import { useEffect, useRef, useState } from 'react';

// Below this scrollY, we're considered "at the top" regardless of direction —
// keeps the header settled in view and the footer settled out of view on load.
const TOP_THRESHOLD = 60;
// Ignore sub-pixel/jitter scroll deltas so direction doesn't flicker.
const DIRECTION_THRESHOLD = 4;
// Time-based throttle rather than requestAnimationFrame — rAF can be paused
// by the browser when the tab isn't visible/focused, which would silently
// stop the header/footer from ever updating.
const THROTTLE_MS = 100;

// Shared by Header (visible at top / on scroll-up) and Footer (visible on
// scroll-down, mirrored) so both react to the same scroll signal.
export function useScrollDirection() {
	const [state, setState] = useState({ direction: 'up', atTop: true });
	const lastY = useRef(0);
	const lastRun = useRef(0);

	useEffect(() => {
		lastY.current = window.scrollY;

		function update() {
			const y = window.scrollY;
			const atTop = y < TOP_THRESHOLD;
			const delta = y - lastY.current;

			if (Math.abs(delta) > DIRECTION_THRESHOLD) {
				setState({ direction: delta > 0 ? 'down' : 'up', atTop });
				lastY.current = y;
			} else {
				setState((prev) => (prev.atTop === atTop ? prev : { ...prev, atTop }));
			}
		}

		function onScroll() {
			const now = Date.now();
			if (now - lastRun.current >= THROTTLE_MS) {
				lastRun.current = now;
				update();
			}
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return state;
}
