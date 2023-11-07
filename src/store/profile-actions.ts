import { Dispatch } from 'redux';

import { profileActions } from './profile-slice';

export const fetchUserData = () => {
	return async (dispatch: Dispatch) => {
		const fetchData = async () => {
			const uid = sessionStorage.getItem('uid');
			const response = await fetch(`https://link-sharing-app-a3954-default-rtdb.firebaseio.com/users/${uid}.json`);
			const data = await response.json();

			return data;
		};

		try {
			const data = await fetchData();
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
		} catch (error) {}
	};
};
