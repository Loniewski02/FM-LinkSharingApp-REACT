import { redirect } from 'react-router-dom';

export const getTokenDuration = () => {
	const storedExpirationDate: string | null = sessionStorage.getItem('expiration');
	if (storedExpirationDate) {
		const expirationDate = new Date(storedExpirationDate);
		const now = new Date();
		const duration = expirationDate.getTime() - now.getTime();
		return duration;
	}
};

export const getAuthToken = () => {
	const token = sessionStorage.getItem('token');

	if (!token) {
		return redirect('/auth');
	}

	const tokenDurtation: number | undefined = getTokenDuration();
	if (tokenDurtation && tokenDurtation < 0) {
		return 'EXPIRED';
	}

	return token;
};

export const tokenLoader = () => {
	return getAuthToken();
};

export const checkAuthLoader = () => {
	const token = getAuthToken();

	if (!token) {
		return redirect('/');
	}

	return null;
};
