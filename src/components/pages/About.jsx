import React from 'react';

import PageWrapper from '../shared/PageWrapper';
import TextHeader from '../shared/TextHeader';

export default function About() {
	return (
		<PageWrapper>
			<div className="main-content horizontal-centered">
				<TextHeader
					title="About me"
					subtitle="My name is Eugene. Originally from Ukraine, now living in Amsterdam. I'm passionate about music, photography and art. My first experiments with photography started in 2015 and have not finished since. This website is a showcase of some of my works that i'm proud of the most."
				/>
			</div>
		</PageWrapper>
	);
}
