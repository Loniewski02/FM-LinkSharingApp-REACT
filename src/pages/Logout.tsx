import { redirect } from 'react-router-dom';

export const action = () => {
	sessionStorage.removeItem('token');
	sessionStorage.removeItem('expiration');
	sessionStorage.removeItem('uid');
	return redirect('/');
};
