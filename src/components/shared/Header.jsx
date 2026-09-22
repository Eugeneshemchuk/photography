import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useScrollDirection } from '../../utils/useScrollDirection';

const menuItems = [
	{ title: 'Home', link: '/' },
	{ title: 'About', link: '/about' },
	{ title: 'Contact', link: '/contact' },
	{ title: 'Instagram', link: 'https://www.instagram.com/shemchuk.eugene/' },
];

export default function Header() {
	const location = useLocation();
	const onHero = location.pathname === '/';
	const { direction, atTop } = useScrollDirection();
	const hidden = !atTop && direction === 'down';
	const [menuOpen, setMenuOpen] = useState(false);

	// Close the mobile menu on navigation, so it never stays open across pages.
	useEffect(() => {
		setMenuOpen(false);
	}, [location.pathname]);

	return (
		<>
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
							{menuItems
								.filter((item) => item.title !== 'Home')
								.map((item, i) => {
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

			{/* Mobile-only: stays visible regardless of the header's scroll-hide state, so
			    navigation is never fully lost while scrolling on a small screen. */}
			<button
				type="button"
				className={'menu-toggle' + (menuOpen ? ' open' : '')}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				onClick={() => setMenuOpen((open) => !open)}
			>
				<span />
				<span />
				<span />
			</button>

			<nav
				className={'mobile-nav-menu' + (menuOpen ? ' open' : '')}
				role="navigation"
				aria-hidden={!menuOpen}
			>
				{menuItems.map((item, i) =>
					item.link.startsWith('http') ? (
						<a key={i} href={item.link} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
							{item.title}
						</a>
					) : (
						<Link key={i} to={item.link} onClick={() => setMenuOpen(false)}>
							{item.title}
						</Link>
					)
				)}
			</nav>
		</>
	);
}
