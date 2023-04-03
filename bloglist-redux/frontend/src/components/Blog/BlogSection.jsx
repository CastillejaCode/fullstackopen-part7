import { useRef } from 'react';
import Togglable from '../Togglable';
import BlogForm from './BlogForm';
import Blogs from './Blogs';
import UserInfo from '../User/UserInfo';

const BlogSection = () => {
  const newBlogRef = useRef();

  return (
    <div>
      <UserInfo />
      <Togglable label='new note' ref={newBlogRef}>
        <h3>Create new note</h3>
        <BlogForm toggle={() => newBlogRef.current.toggleVisible()} />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default BlogSection;
