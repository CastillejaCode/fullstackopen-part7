import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		addNotificaton(state, action) {
			return action.payload;
		},
		removeNotification(state, action) {
			return null;
		},
	},
});

export const { addNotificaton, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
