import { useEffect, useRef, useContext } from 'react';
import { useQuery } from 'react-query';
import UserContext from './UserContext';

import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

import { getBlogs, setToken } from './requests';

//TODO: fix services for both repos

const App = () => {
  const [user, userDispatch] = useContext(UserContext);

  const newBlogRef = useRef();

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setToken(user.token);
      userDispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('user');
    userDispatch({ type: 'LOGOUT' });
    setToken(null);
  };

  const result = useQuery('blogs', getBlogs);
  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const blogs = result.data;

  const blogsSection = () => {
    return (
      <div>
        <h2>blogs</h2>
        <h3>
          {user.name} logged in{' '}
          <button type='button' onClick={handleLogout}>
            Logout
          </button>
        </h3>
        <Togglable label='new note' ref={newBlogRef}>
          <h3>Create new note</h3>
          <BlogForm toggle={() => newBlogRef.current.toggleVisible()} />
        </Togglable>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
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
