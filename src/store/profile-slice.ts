import { createSlice } from '@reduxjs/toolkit';

const inputState = { value: '', msgError: '', hasError: false, isValid: true };

const initialState = {
	picture: '',
	name: inputState,
	lastName: inputState,
	email: inputState,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState: initialState,
	reducers: {
		replaceData(state, action) {
			state.picture = action.payload.picture;
			state.name.value = action.payload.name;
			state.lastName.value = action.payload.lastName;
			state.email.value = action.payload.email;
		},
		profilePicHandler(state) {
			const imgAddress = window.prompt('Paste image address: (if u want to delete image dont type anything)');
			if (imgAddress) {
				localStorage.setItem('image', imgAddress);
				state.picture = imgAddress;
			} else {
				localStorage.setItem('image', '');

				state.picture = '';
			}
		},
		inputHandler(state, action) {
			const { field, value } = action.payload as { field: 'name' | 'lastName'; value: string };

			state[field].value = value;

			if (value.trim().length > 0) {
				state[field].isValid = true;
				state[field].hasError = false;
			} else {
				state[field].isValid = false;
				state[field].hasError = true;
			}

			if (!state[field].isValid) {
				state[field].msgError = "Can't be blank";
			}
		},
		emailHandler(state, action) {
			const reg =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const value = action.payload;

			state.email.value = value;
			state.email.hasError = !state.email.isValid;

			if (state.email.value.trim().length >= 1) {
				state.email.isValid = reg.test(value);
			}

			if (!state.email.isValid) {
				state.email.msgError = 'Please enter a valid email';
			}
		},
	},
});

export const profileActions = profileSlice.actions;
export default profileSlice;
