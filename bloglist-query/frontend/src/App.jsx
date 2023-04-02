import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';

import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

import { NotificationContextProvider } from './NotificationContext';
import NotificationContext from './NotificationContext';

//TODO: fix services for both repos

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //   const [errorMessage, setErrorMessage] = useState(null);

  const [notification, notificationDispatch] = useContext(NotificationContext);

  const setNotification = (message, seconds = 5) => {
    notificationDispatch({
      type: 'ADD_NOTIFICATION',
      payload: `${message}`
    });
    setTimeout(
      () => notificationDispatch({ type: 'DELETE_NOTIFICATION' }),
      seconds * 1000
    );
  };

  const newBlogRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogsReturn) =>
        setBlogs(blogsReturn.sort((a, b) => b.likes - a.likes))
      );
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login({ username, password });

      window.localStorage.setItem('user', JSON.stringify(response));
      setUser(response);
      blogService.setToken(response.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotification('Wrong Credentials!', 3);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
    window.localStorage.removeItem('user');
    setUser(null);
    blogService.setToken(null);
  };

  const addBlog = async (blog) => {
    const response = await blogService.create(blog);
    setNotification(
      `NEW BLOG: Added ${response.title} by ${response.author}!`,
      5
    );
    newBlogRef.current.toggleVisible();
    setBlogs(blogs.concat(response));
  };

  const updateBlog = async (id, blog) => {
    const response = await blogService.udpate(id, blog);
    setBlogs(
      blogs
        .filter((blog) => (blog.id === id ? response : blog))
        .sort((a, b) => b.likes - a.likes)
    );
  };

  const deleteBlog = async (id, blog) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}`
      )
    ) {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => (blog.id === id ? null : blog)));
    }
  };

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
          <BlogForm handleCreate={addBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdate={updateBlog}
            handleDelete={deleteBlog}
            user={user}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Notification />

      {user ? (
        blogsSection()
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={(event) => setUsername(event.target.value)}
          handlePasswordChange={(event) => setPassword(event.target.value)}
        />
      )}
    </div>
  );
};

export default App;
