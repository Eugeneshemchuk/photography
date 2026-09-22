import React from 'react';
import Gallery from 'react-photo-gallery';
import { Link } from 'react-router-dom';

import PageWrapper from '../shared/PageWrapper';
import HeroSlideshow from '../shared/HeroSlideshow';
import { albums, getAlbum } from '../../utils/photoLibrary';

// Homepage hero rotates through the RANDOM album, always opening on its cover.
const heroAlbum = getAlbum('random');
const heroPhotos = heroAlbum.photos.map((photo) => photo.src);

// Homescreen hero + scroll-reveal grid, recovered from the "Home Desktop" /
// "Home Mobile" artboards in the designer's Sketch file — a layout that was
// designed but never implemented; the shipped site skipped straight to the grid.
export default function Categories() {
	// Fixed 3:4 ratio for every cover, regardless of the source photo's real aspect ratio —
	// matches the live site's category tiles exactly (confirmed 0.75 width/height ratio).
	// react-photo-gallery sizes tiles from this ratio, so a uniform one gives equal-width
	// tiles; object-fit: cover (see page.scss .category-img) crops each photo to fit.
	const coverPhotos = albums.map((album) => ({
		src: album.cover.src,
		width: 3,
		height: 4,
		slug: album.slug,
		title: album.title,
		overlayColor: album.overlayColor,
	}));

	return (
		<>
			<section className="home-hero">
				<HeroSlideshow first={heroAlbum.cover.src} photos={heroPhotos} />
				<div className="home-hero-overlay" />
				<div className="home-hero-scroll-cue">Scroll to explore</div>
			</section>
			<PageWrapper className="home-page">
				<div className="main-content">
					<Gallery
						photos={coverPhotos}
						direction="column"
						margin={12}
						renderImage={(item) => {
							const { photo } = item;

							return (
								<Link
									className="category"
									key={item.index}
									to={'/album/' + photo.slug}
									style={{ width: photo.width, height: photo.height }}
								>
									<div className="category-overlay" style={{ backgroundColor: photo.overlayColor }} />
									<img className="category-img" src={photo.src} alt={photo.title} />
									<h2 className="category-title">{photo.title}</h2>
								</Link>
							);
						}}
					/>
				</div>
			</PageWrapper>
		</>
	);
}
