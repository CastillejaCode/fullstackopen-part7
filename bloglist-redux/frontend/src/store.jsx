import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
	reducer: {
		notificaiton: notificationReducer,
	},
});

export default store;
