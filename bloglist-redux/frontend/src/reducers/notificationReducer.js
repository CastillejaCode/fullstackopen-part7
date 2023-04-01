/* eslint-disable no-unused-vars */
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

export const setNotification = (message, seconds) => {
	return (dispatch) => {
		dispatch(addNotificaton(message));
		setTimeout(() => dispatch(removeNotification()), seconds * 1000);
	};
};

export default notificationSlice.reducer;
