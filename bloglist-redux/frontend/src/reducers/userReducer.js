import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
		removeUser(state, action) {
			return null;
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;

export const loginUser = (credentials) => {
	console.log(credentials);
	return async (dispatch) => {
		const response = await loginService.login(credentials);
		window.localStorage.setItem('user', JSON.stringify(response));
		blogService.setToken(response.token);
		dispatch(setUser(response));
	};
};

export const logout = () => {
	return (dispatch) => {
		window.localStorage.removeItem('user');
		dispatch(removeUser());
		blogService.setToken(null);
	};
};

export const initializeUser = () => {
	return (dispatch) => {
		const userJSON = window.localStorage.getItem('user');
		if (userJSON) {
			const user = JSON.parse(userJSON);
			dispatch(setUser(user));
			blogService.setToken(user.token);
		}
	};
};

export default userSlice.reducer;
