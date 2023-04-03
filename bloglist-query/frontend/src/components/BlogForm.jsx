import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createBlog } from '../requests';
import NotificationContext from '../NotificationContext';

const BlogForm = ({ toggle }) => {
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  });

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

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    newBlogMutation.mutate({ title, author, url });
    setNotification(`NEW BLOG: Added ${title} by ${author}!`, 5);
    setTitle('');
    setAuthor('');
    setUrl('');
    toggle();
  };
  return (
    <form onSubmit={addBlog}>
      <div>
        Title
        <input
          className='title'
          type='text'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        Author
        <input
          className='author'
          type='text'
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        url
        <input
          className='url'
          type='text'
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <button type='submit' className='create'>
        create
      </button>
    </form>
  );
};

export default BlogForm;
