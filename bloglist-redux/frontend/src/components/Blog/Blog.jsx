import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, updateBlog } from '../../reducers/blogReducer';

const Blog = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id));
  const user = useSelector(({ user }) => user);
  if (!blog) return null;

  const addLikes = () => {
    dispatch(updateBlog(blog));
  };

  const removeBlog = () => {
    const windowConfirm = window.confirm(
      `Are you sure you want to delete ${blog.title} by ${blog.author}`
    );
    if (windowConfirm) dispatch(deleteBlog(blog.id));
  };

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <br />
      {blog.url}
      <br />
      Likes: {blog.likes}
      <button type='button' onClick={addLikes}>
        like!
      </button>
      <br />
      added by {blog.user.name}
      <br />
      {user.username === blog.user.username && (
        <button type='button' className='remove' onClick={removeBlog}>
          remove
        </button>
      )}
    </div>
  );
};

export default Blog;
