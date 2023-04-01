import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		createBlog(state, action) {
			state.push(action.payload);
		},
		removeBlog(state, action) {
			const { id } = action.payload;
			state.filter((blog) => blog.id !== id);
		},
		initialBlogs(state, action) {
			return action.payload;
		},
	},
});

export const { createBlog, initialBlogs, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
	return async (dispatch) => {
		const response = await blogService.getAll();

		// Sorting
		response.sort((a, b) => b.likes - a.likes);
		dispatch(initialBlogs(response));
	};
};

export const addBlog = (blog) => {
	return async (dispatch) => {
		const response = await blogService.create(blog);
		dispatch(createBlog(response));
	};
};

export const deleteBlog = (id) => {
	return async (dispatch) => {
		await blogService.remove(id);
		dispatch(removeBlog(id));
	};
};

export default blogSlice.reducer;
