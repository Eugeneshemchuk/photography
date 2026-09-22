import React from 'react';

const STAGGER = 0.18;

// Large short lines that fade in one after another, alternating white and grey.
// Anything passed as children fades in right after the last line.
export default function RevealLines({ lines, children }) {
	return (
		<div className="reveal-lines">
			{lines.map((line, i) => (
				<p className="reveal-item" key={line} style={{ animationDelay: `${i * STAGGER}s` }}>
					{line}
				</p>
			))}
			{children && (
				<div className="reveal-item reveal-extra" style={{ animationDelay: `${lines.length * STAGGER + 0.2}s` }}>
					{children}
				</div>
			)}
		</div>
	);
}
