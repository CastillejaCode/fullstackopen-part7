import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

import BlogSection from './components/BlogSection';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, []);

  const user = useSelector(({ user }) => user);

  return (
    <div>
      <Notification />
      {user ? <BlogSection /> : <LoginForm />}
    </div>
  );
};

export default App;
