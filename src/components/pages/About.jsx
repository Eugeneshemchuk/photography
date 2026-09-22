import React from 'react';

import PageWrapper from '../shared/PageWrapper';
import RevealLines from '../shared/RevealLines';
import backgroundImage from '../../assets/about/DSC_6316.jpg';

const lines = [
	'My name is Eugene.',
	'Originally from Ukraine,',
	'now living in Amsterdam.',
	'Music, photography, art.',
	'Shooting since 2015 —',
	'not finished yet.',
];

export default function About() {
	return (
		<PageWrapper className="photo-page">
			<img className="photo-page-image" src={backgroundImage} alt="" />
			<div className="photo-page-overlay" />
			<div className="main-content horizontal-centered">
				<RevealLines lines={lines} />
			</div>
		</PageWrapper>
	);
}
