import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Gallery from 'react-photo-gallery';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import PageWrapper from '../shared/PageWrapper';
import TextHeader from '../shared/TextHeader';
import Footer from '../shared/Footer';
import { getAlbum } from '../../utils/photoLibrary';

export default function Album() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);

	const { albumName } = useParams();
	const album = getAlbum(albumName);
	const photos = album ? album.photos : [];

	const openLightbox = useCallback((event, { index }) => {
		setCurrentIndex(index);
		setViewerIsOpen(true);
	}, []);

	const closeLightbox = () => setViewerIsOpen(false);

	return (
		<PageWrapper className="has-footer">
			<div className="main-content">
				{photos.length > 0 ? (
					<div>
						<TextHeader alignment="center" title={album.title} />
						<Gallery photos={photos} direction="column" margin={12} onClick={openLightbox} />
						<Lightbox
							open={viewerIsOpen}
							close={closeLightbox}
							index={currentIndex}
							slides={photos.map((p) => ({ src: p.src, width: p.width, height: p.height }))}
						/>
					</div>
				) : (
					<div className="horizontal-centered">
						<TextHeader title="Empty album" subtitle="This album does not contain any images yet" />
					</div>
				)}
			</div>

			<Footer />
		</PageWrapper>
	);
}
