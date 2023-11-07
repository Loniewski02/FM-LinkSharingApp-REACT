import { Dispatch } from 'redux';

import { linksActions } from './links-slice';
import { uiActions } from './ui-slice';

export const fetchLinksData = () => {
	return async (dispatch: Dispatch) => {
		const fetchData = async () => {
			const uid = sessionStorage.getItem('uid');
			const token = sessionStorage.getItem('token');

			const response = await fetch(
				`https://link-sharing-app-a3954-default-rtdb.firebaseio.com/users/${uid}.json?auth=${token}`
			);

			const data = await response.json();

			return data;
		};

		try {
			dispatch(uiActions.loading());
			const data = await fetchData();
			if (data && data.links) {
				dispatch(linksActions.replaceData(data.links));
			}
			dispatch(uiActions.notLoading());
		} catch (error) {
			console.error(error);
		}
	};
};
