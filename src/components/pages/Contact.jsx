import React from 'react';

import PageWrapper from '../shared/PageWrapper';
import TextHeader from '../shared/TextHeader';
import contactImage from '../../assets/contact/DSC_2010.jpg';

export default function Contact() {
	return (
		<PageWrapper className="contact-page">
			<img className="contact-page-image" src={contactImage} alt="" />
			<div className="contact-page-overlay" />
			<div className="main-content horizontal-centered">
				<TextHeader
					alignment="center"
					title="Get in touch"
					subtitle="Have a project in mind or just want to say hi? Send me an email."
				/>
				<a className="contact-button" href="mailto:shemchuk.eugene@gmail.com">
					Contact Me
				</a>
			</div>
		</PageWrapper>
	);
}
