import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { logout } from '../reducers/userReducer';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import Blogs from './Blogs';

const BlogSection = () => {
  const dispatch = useDispatch();
  const newBlogRef = useRef();

  const user = useSelector(({ user }) => user);

  return (
    <div>
      <h2>blogs</h2>
      <h3>
        {user.name} logged in
        <button type='button' onClick={() => dispatch(logout())}>
          Logout
        </button>
      </h3>
      <Togglable label='new note' ref={newBlogRef}>
        <h3>Create new note</h3>
        <BlogForm toggle={() => newBlogRef.current.toggleVisible()} />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default BlogSection;
