/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    }
  }
});

export const { setUser, removeUser } = userSlice.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await loginService.login(credentials);
      window.localStorage.setItem('user', JSON.stringify(response));
      blogService.setToken(response.token);
      dispatch(setUser(response));
    } catch (error) {
      dispatch(setNotification(`Wrong credentials!`, 3));
    }
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
