import React from 'react';

import PageWrapper from '../shared/PageWrapper';
import RevealLines from '../shared/RevealLines';
import contactImage from '../../assets/contact/DSC_2010.jpg';

const lines = ['Get in touch.', 'Have a project in mind', 'or just want to say hi?', 'Send me an email.'];

export default function Contact() {
	return (
		<PageWrapper className="photo-page">
			<img className="photo-page-image" src={contactImage} alt="" />
			<div className="photo-page-overlay" />
			<div className="main-content horizontal-centered">
				<RevealLines lines={lines}>
					<a className="contact-button" href="mailto:shemchuk.eugene@gmail.com">
						Contact Me
					</a>
				</RevealLines>
			</div>
		</PageWrapper>
	);
}
