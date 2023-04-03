import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';
import { initializeUsers } from './reducers/usersReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogSection from './components/BlogSection';
import Users from './components/Users';

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
        <Link to='/' />
        <Link to='/users' />
      </div>

      <Routes>
        <Route
          path='/'
          element={
            <div>
              <Notification />
              {user ? <BlogSection /> : <LoginForm />}
            </div>
          }
        />
        <Route path='/users' element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;
