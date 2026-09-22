import React from 'react';

export default function TextHeader({ title, subtitle, alignment }) {
	let alignClass = 'align-left';

	if (alignment === 'center') {
		alignClass = 'align-center';
	} else if (alignment === 'right') {
		alignClass = 'align-right';
	}

	return (
		<div className="page-text-wrapper">
			<h1 className={'page-title ' + alignClass}>
				<span>{title}</span>
			</h1>
			{subtitle && (
				<div className={'page-description ' + alignClass}>
					<p style={{ whiteSpace: 'pre-wrap' }}>
						<span>{subtitle}</span>
					</p>
				</div>
			)}
		</div>
	);
}
