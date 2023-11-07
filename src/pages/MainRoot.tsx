import { useEffect } from 'react';
import { useSubmit, Outlet, useLoaderData, redirect } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchUserData } from '../store/profile-actions';
import { fetchLinksData } from '../store/links-actions';
import { getTokenDuration } from '../util/auth';

import LoadingIndicator from '../components/UI/LoadingIndicator';

const MainRootLayout: React.FC = () => {
	const isLoading = useAppSelector((state) => state.ui.isLoading);
	const dispatch = useAppDispatch();
	const token = useLoaderData();
	const submit = useSubmit();

	useEffect(() => {
		dispatch(fetchUserData());
		dispatch(fetchLinksData());
	}, [dispatch]);

	useEffect(() => {
		if (!token) {
			redirect('/auth');
		}

		if (token === 'EXPIRED') {
			submit(null, { action: '/logout', method: 'post' });
			return;
		}

		const tokenDurtation = getTokenDuration();

		setTimeout(() => {
			submit(null, { action: '/logout', method: 'post' });
		}, tokenDurtation);
	}, [token, submit]);

	return (
		<main>
			{isLoading && <LoadingIndicator />}
			<Outlet />
		</main>
	);
};

export default MainRootLayout;
