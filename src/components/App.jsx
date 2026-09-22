import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './shared/Router';

// Base path the site is served from. Defaults to root; set VITE_BASE_PATH
// (and Vite's `base` in vite.config.js) to move the deployed URL later
// (e.g. to /photography) without touching any component code.
const basename = import.meta.env.VITE_BASE_PATH || '/';

function App() {
	return (
		<BrowserRouter basename={basename}>
			<Router />
		</BrowserRouter>
	);
}

export default App;
