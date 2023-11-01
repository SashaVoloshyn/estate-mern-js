import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AboutPage, HomePage, ProfilePage, SignInPage, SignOutPage } from './pages';
import { Header } from './components';

const App = () => {
	return (
		<BrowserRouter>
			<Header/>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/sign-in' element={<SignInPage />} />
				<Route path='/sign-out' element={<SignOutPage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='/profile' element={<ProfilePage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
