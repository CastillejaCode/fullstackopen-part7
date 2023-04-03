import { useMutation, useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';
import { removeBlog, updateBlog } from '../requests';

const Blog = ({ blog, user }) => {
  const queryClient = useQueryClient();
  const blogDeleteMutation = useMutation(removeBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  });
  const blogUpdateMutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  });

  const [expand, setExpand] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLikes(blog.likes);
  }, []);

  const addLikes = (event) => {
    event.preventDefault();
    const tempLikes = blog.likes + 1;
    blogUpdateMutation.mutate(blog);
    setLikes(tempLikes);
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}`
      )
    )
      blogDeleteMutation.mutate(blog.id);
  };

  return (
    <div className='blog'>
      <div>
        {blog.title} by {blog.author}
        <button type='button' onClick={toggleExpand}>
          {expand ? 'hide' : 'view'}
        </button>
      </div>
      {expand && (
        <div className='expand'>
          {blog.url}
          <br />
          Likes: {likes}{' '}
          <button type='button' onClick={addLikes}>
            like!
          </button>
          <br />
          User: {blog.user.name}
          <br />
          {user.username === blog.user.username && (
            <button type='button' className='remove' onClick={handleDelete}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
