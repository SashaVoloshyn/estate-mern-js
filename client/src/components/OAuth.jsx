import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { app } from '../../firebase.js';
import { signInSuccess } from '../redux/users/usersSlice.js';

const OAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleGoogleClick = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);

			const result = await signInWithPopup(auth, provider);

			const res = await fetch('/api/auth/google', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: result.user.displayName,
					email: result.user.email,
					photo: result.user.photoURL,
				}),
			});
			const data = await res.json();
			dispatch(signInSuccess(data));
			navigate('/');
		} catch (e) {
			console.error('could not sign in with GOOGLE', e);
		}
	};
	return (
		<button
			onClick={handleGoogleClick}
			type='button'
			className='bg-emerald-600 text-white p-3 rounded-lg uppercase hover:opacity-80'
		>
			Continue with Google
		</button>
	);
};

export { OAuth };
