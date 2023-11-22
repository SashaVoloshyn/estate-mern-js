import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AboutPage, HomePage, ProfilePage, SignInPage, SignUpPage } from './pages';
import { Header, PrivateRoute } from './components';

const App = () => {
	return (
		<BrowserRouter>
			<Header/>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/sign-in' element={<SignInPage />} />
				<Route path='/sign-up' element={<SignUpPage />} />
				<Route path='/about' element={<AboutPage />} />

				<Route element={<PrivateRoute />}>
					<Route path='/profile' element={<ProfilePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
