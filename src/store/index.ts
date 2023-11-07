import { configureStore } from '@reduxjs/toolkit';

import linksSlice from './links-slice';
import profileSlice from './profile-slice';
import uiSlice from './ui-slice';

const store = configureStore({
	reducer: {
		links: linksSlice.reducer,
		profile: profileSlice.reducer,
		ui: uiSlice.reducer,
	},
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
