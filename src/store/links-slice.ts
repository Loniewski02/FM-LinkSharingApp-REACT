import { createSlice } from '@reduxjs/toolkit';

import { Links } from '../helpers/types';

const reg = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/|ftp:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?/;

const initialState: { links: Links; isValid: boolean } = {
	links: [],
	isValid: false,
};

const linksSlice = createSlice({
	name: 'links',
	initialState: initialState,
	reducers: {
		replaceData(state, action) {
			state.links = [...action.payload];
		},
		addLink(state) {
			state.links.push({
				id: Math.random(),
				platform: {
					name: '',
					class: '',
					isValid: true,
				},
				url: { value: '', isValid: true },
			});
		},
		addPlatform(state, action) {
			state.links = state.links.map((link) => {
				if (link.id === action.payload.id) {
					if (action.payload.name !== '') {
						link.platform = {
							name: action.payload.name,
							class: action.payload.class,
							isValid: true,
						};
					} else {
						link.platform = {
							...link.platform,
							isValid: false,
						};
					}
				}

				return link;
			});
		},
		addUrl(state, action) {
			const enteredUrl = action.payload.url;
			state.links = state.links.map((link) => {
				if (link.id === action.payload.id) {
					if (enteredUrl.trim().length > 1 && reg.test(enteredUrl)) {
						link.url = { value: enteredUrl, isValid: true };
					} else {
						link.url = { value: enteredUrl, isValid: false };
					}
				}
				return link;
			});
		},
		checkValidity(state) {
			if (state.links.length === 0) {
				state.isValid = true;
			}

			state.links = state.links.map((link) => {
				if (link.platform.name === '' || !reg.test(link.url.value)) {
					state.isValid = false;
				} else {
					state.isValid = true;
				}
				return link;
			});
		},
		deleteLink(state, action) {
			state.links = state.links.filter((link) => link.id !== action.payload);
		},
	},
});

export const linksActions = linksSlice.actions;
export default linksSlice;
