import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, updateBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  const [expand, setExpand] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLikes(blog.likes);
  }, []);

  const addLikes = (blog) => {
    const tempLikes = blog.likes + 1;
    dispatch(updateBlog(blog));
    setLikes(tempLikes);
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const removeBlog = (blog) => {
    const windowConfirm = window.confirm(
      `Are you sure you want to delete ${blog.title} by ${blog.author}`
    );
    if (windowConfirm) dispatch(deleteBlog(blog.id));
  };

  const expandedView = () => {
    return (
      <div className='expand'>
        {blog.url}
        <br />
        Likes: {likes}
        <button type='button' onClick={() => addLikes(blog)}>
          like!
        </button>
        <br />
        User: {blog.user.name}
        <br />
        {user.username === blog.user.username && (
          <button
            type='button'
            className='remove'
            onClick={() => removeBlog(blog)}>
            remove
          </button>
        )}
      </div>
    );
  };
  return (
    <div>
      <div>
        {blog.title} by {blog.author}
        <button type='button' onClick={toggleExpand}>
          {expand ? 'hide' : 'view'}
        </button>
      </div>
      {expand && expandedView()}
    </div>
  );
};

export default Blog;
