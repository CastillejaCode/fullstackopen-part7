import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';
import Blogs from './components/Blogs';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

//TODO: reset form on submit

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeUser());
	}, []);

	const blogs = useSelector(({ blogs }) => blogs);
	const user = useSelector(({ user }) => user);

	// const [username, setUsername] = useState('');
	// const [password, setPassword] = useState('');

	const newBlogRef = useRef();

	// useEffect(() => {
	// 	blogService
	// 		.getAll()
	// 		.then((blogsReturn) =>
	// 			setBlogs(blogsReturn.sort((a, b) => b.likes - a.likes))
	// 		);
	// }, []);

	// useEffect(() => {
	// 	const userJSON = window.localStorage.getItem('user');
	// 	if (userJSON) {
	// 		const user = JSON.parse(userJSON);
	// 		setUser(user);
	// 		blogService.setToken(user.token);
	// 	}
	// }, []);

	// const handleLogin = async (event) => {
	// 	event.preventDefault();
	// 	try {
	// 		const response = await loginService.login({ username, password });
	// 		window.localStorage.setItem('user', JSON.stringify(response));
	// 		setUser(response);
	// 		blogService.setToken(response.token);
	// 		setUsername('');
	// 		setPassword('');
	// 	} catch (exception) {
	// 		dispatch(setNotification('Wrong credentials', 3));
	// 	}
	// };

	const handleLogout = (event) => {
		event.preventDefault();
		setUsername('');
		setPassword('');
		window.localStorage.removeItem('user');
		setUser(null);
		blogService.setToken(null);
	};

	const addBlog = async (blog) => {
		// const response = await blogService.create(blog);
		// dispatch(setNotification(`You have added ${response.title}`, 5));
		newBlogRef.current.toggleVisible();
		// setBlogs(blogs.concat(response));
	};

	const updateBlog = async (id, blog) => {
		const response = await blogService.udpate(id, blog);
		setBlogs(
			blogs
				.filter((blog) => (blog.id === id ? response : blog))
				.sort((a, b) => b.likes - a.likes)
		);
	};

	// const deleteBlog = async (id, blog) => {
	// 	if (
	// 		window.confirm(
	// 			`Are you sure you want to delete ${blog.title} by ${blog.author}`
	// 		)
	// 	) {
	// 		await blogService.remove(id);
	// 		setBlogs(blogs.filter((blog) => (blog.id === id ? null : blog)));
	// 	}
	// };

	const blogsSection = () => {
		return (
			<div>
				<h2>blogs</h2>
				<h3>
					{user.name} logged in
					<button type='button' onClick={handleLogout}>
						Logout
					</button>
				</h3>
				<Togglable label='new note' ref={newBlogRef}>
					<h3>Create new note</h3>
					<BlogForm />
				</Togglable>
				<Blogs />
			</div>
		);
	};

	return (
		<div>
			<Notification />

			{user ? blogsSection() : <LoginForm />}
		</div>
	);
};

export default App;
