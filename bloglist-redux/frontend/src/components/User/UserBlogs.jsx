import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserBlogs = () => {
  const { id } = useParams();
  const blogs = useSelector(({ blogs }) =>
    blogs.filter((blog) => blog.user.id === id)
  );

  return (
    <div>
      <h2>added blogs</h2>
      <ul>
        {blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default UserBlogs;
