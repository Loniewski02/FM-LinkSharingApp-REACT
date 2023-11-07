import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',
	initialState: { isLoading: false },
	reducers: {
		loading(state) {
			state.isLoading = true;
		},
		notLoading(state) {
			state.isLoading = false;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice;
