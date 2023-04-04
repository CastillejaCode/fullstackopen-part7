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
			const id = action.payload;
			return state.filter((blog) => blog.id !== id);
		},
		initialBlogs(state, action) {
			return action.payload;
		},
		updateVote(state, action) {
			const response = action.payload;
			const { id } = action.payload;
			return state
				.map((blog) => (blog.id === id ? response : blog))
				.sort((a, b) => b.likes - a.likes);
		},
		createComment(state, action) {
			const response = action.payload;
			const { id } = action.payload;
			return state.map((blog) => (blog.id === id ? response : blog));
		}
	}
});

export const {
	createBlog,
	initialBlogs,
	removeBlog,
	updateVote,
	createComment
} = blogSlice.actions;

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

export const updateBlog = (blog) => {
	return async (dispatch) => {
		const response = await blogService.update({
			...blog,
			user: blog.user.id,
			likes: blog.likes + 1
		});
		dispatch(updateVote(response));
	};
};

export const addComment = (id, comment) => {
	return async (dispatch) => {
		const response = await blogService.addComment(id, { content: comment });
		dispatch(createComment(response));
	};
};

export default blogSlice.reducer;
