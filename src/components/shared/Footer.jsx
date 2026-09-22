import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { categories } from '../../data/categories';
import { useScrollDirection } from '../../utils/useScrollDirection';

export default function Footer() {
	const location = useLocation();
	const category = location.pathname.split('/')[2];
	const { direction, atTop } = useScrollDirection();
	const hidden = atTop || direction === 'up';

	return (
		<nav className={'footer' + (hidden ? ' hidden' : '')} role="navigation">
			{categories.map((cat, i) => {
				return (
					<Link
						key={i}
						className={'footer-item' + (category === cat.slug ? ' active' : '')}
						to={'/album/' + cat.slug}
					>
						{cat.title}
					</Link>
				);
			})}
		</nav>
	);
}
