import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useScrollDirection } from '../../utils/useScrollDirection';

export default function Header() {
	const location = useLocation();
	const onHero = location.pathname === '/';
	const { direction, atTop } = useScrollDirection();
	const hidden = !atTop && direction === 'down';

	const menuItems = [
		{ title: 'About', link: '/about' },
		{ title: 'Contact', link: '/contact' },
		{ title: 'Instagram', link: 'https://www.instagram.com/shemchuk.eugene/' },
	];

	return (
		<header
			id="header"
			className={'site-header loaded' + (onHero ? ' on-hero' : '') + (hidden ? ' hidden' : '')}
			role="banner"
		>
			<div className="left">
				<div className="logo-wrapper">
					<div className="site-title">
						<Link to="/">Eugene Shemchuk</Link>
					</div>
				</div>

				<div id="mainNavWrapper" className="nav-wrapper">
					<nav className="site-navigation" role="navigation" data-content-field="navigation">
						{menuItems.map((item, i) => {
							return (
								<div key={i} className="nav-item index">
									{item.link.startsWith('http') ? (
										<a href={item.link} className="nav-item-index" target="_blank" rel="noreferrer">
											<span>{item.title}</span>
										</a>
									) : (
										<Link to={item.link} className="nav-item-index">
											<span>{item.title}</span>
										</Link>
									)}
								</div>
							);
						})}
					</nav>
				</div>
			</div>
		</header>
	);
}
