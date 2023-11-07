import { Dispatch } from 'redux';

import { uiActions } from './ui-slice';
import { profileActions } from './profile-slice';

export const fetchUserData = () => {
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
			const data = await fetchData();
			dispatch(uiActions.loading());
			if (data) {
				dispatch(
					profileActions.replaceData({
						picture: data.profilePic,
						name: data.name,
						lastName: data.lastName,
						email: data.email,
					})
				);
			}
			dispatch(uiActions.notLoading());
		} catch (error) {
			console.error(error);
		}
	};
};
