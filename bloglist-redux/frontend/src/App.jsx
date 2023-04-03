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
    <Router>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/users'>Users</Link>
        <UserInfo />
      </div>

      <Routes>
        <Route
          path='/'
          element={
            <div>
              <Notification />
              <h1>Blog app</h1>
              {user ? <BlogSection /> : <LoginForm />}
            </div>
          }
        />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UserBlogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </Router>
  );
};

export default App;
