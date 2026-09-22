import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Categories from '../pages/Categories';
import Album from '../pages/Album';
import About from '../pages/About';
import Contact from '../pages/Contact';

function Router() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/album/:albumName" element={<Album />} />
				<Route path="/" element={<Categories />} />
			</Routes>
		</>
	);
}

export default Router;
