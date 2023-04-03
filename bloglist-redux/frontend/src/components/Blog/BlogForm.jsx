import { useDispatch } from 'react-redux';
import { addBlog } from '../../reducers/blogReducer';
import { setNotification } from '../../reducers/notificationReducer';

const BlogForm = ({ toggle }) => {
  const dispatch = useDispatch();

  const createBlog = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    dispatch(
      addBlog({
        title,
        author,
        url
      })
    );
    dispatch(setNotification(`You added "${title}"`, 5));
    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';
    toggle();
  };
  return (
    <form onSubmit={createBlog}>
      <div>
        Title
        <input
          className='title'
          name='title'
          type='text'
          // value={title}
          // onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        Author
        <input
          className='author'
          name='author'
          type='text'
          // value={author}
          // onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        url
        <input
          className='url'
          name='url'
          type='text'
          // value={url}
          // onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <button type='submit' className='create'>
        create
      </button>
    </form>
  );
};

export default BlogForm;
