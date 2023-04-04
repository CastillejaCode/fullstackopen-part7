import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';
import { initializeUsers } from './reducers/usersReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogSection from './components/Blog/BlogSection';
import Users from './components/User/Users';
import UserBlogs from './components/User/UserBlogs';
import UserInfo from './components/User/UserInfo';
import Blog from './components/Blog/Blog';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeUser());
		dispatch(initializeUsers());
	}, []);

	const user = useSelector(({ user }) => user);

	return (
		<div className='flex flex-col items-center rounded-lg'>
			<Router>
				{user && (
					<div className='flex '>
						<div className='my-2 flex gap-3 text-lg'>
							<Link
								to='/'
								className='rounded-md px-2 transition duration-200 ease-in-out hover:bg-slate-400'>
								Home
							</Link>
							<Link
								to='/users'
								className='rounded-md px-2 transition duration-200 ease-in-out hover:bg-slate-400'>
								Users
							</Link>
						</div>
						<UserInfo />
					</div>
				)}
				<Routes>
					<Route
						path='/'
						element={
							<div>
								<h1 className='mb-6 text-center text-4xl text-gray-900'>
									Blog app
								</h1>
								{user ? <BlogSection /> : <LoginForm />}
							</div>
						}
					/>
					<Route path='/users' element={<Users />} />
					<Route path='/users/:id' element={<UserBlogs />} />
					<Route path='/blogs/:id' element={<Blog />} />
				</Routes>
				<Notification />
			</Router>
		</div>
	);
};

export default App;
