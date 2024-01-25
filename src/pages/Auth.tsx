import { useSearchParams } from 'react-router-dom';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Reset from '../components/auth/Reset';

const AuthPage = () => {

	const [params] = useSearchParams();
	const mode = params.get('mode');
	const defaultMode = !mode || mode === '' ? 'login' : mode;
	const isLogin = defaultMode === 'login';
	const isRegister = defaultMode === 'register';
	const isReset = defaultMode === 'reset';


	return (
		<>
			{isLogin && <Login />}
			{isReset && <Reset />}
			{isRegister && <Register />}
		</>
	);
};

export default AuthPage;
