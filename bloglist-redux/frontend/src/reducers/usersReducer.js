import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    getUsers(state, action) {
      return action.payload;
    }
  }
});

export const { getUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const response = await usersService.getUsers();
    dispatch(getUsers(response));
  };
};

export default usersSlice.reducer;
