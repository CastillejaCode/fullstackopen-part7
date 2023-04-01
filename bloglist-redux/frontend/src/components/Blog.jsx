import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog, handleUpdate, user }) => {
	const dispatch = useDispatch();

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};
	const [expand, setExpand] = useState(false);
	const [likes, setLikes] = useState(0);
	useEffect(() => {
		setLikes(blog.likes);
	}, []);

	const addLikes = (event) => {
		event.preventDefault();
		const tempLikes = ++blog.likes;
		handleUpdate(blog.id, {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			user: blog.user.id,
			likes: tempLikes,
		});
		setLikes(tempLikes);
	};

	const toggleExpand = () => {
		setExpand(!expand);
	};

	const removeBlog = (blog) => {
		if (
			window.confirm(
				`Are you sure you want to delete ${blog.title} by ${blog.author}`
			)
		)
			dispatch(deleteBlog(blog.id));
	};
	return (
		<div className='blog' style={blogStyle}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				{blog.title} by {blog.author}
				<button type='button' onClick={toggleExpand}>
					{expand ? 'hide' : 'view'}
				</button>
			</div>
			{expand ? (
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
					{user.username === blog.user.username ? (
						<button
							type='button'
							className='remove'
							onClick={() => removeBlog(blog)}>
							remove
						</button>
					) : (
						''
					)}
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default Blog;
