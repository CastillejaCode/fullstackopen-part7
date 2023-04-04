import { useRef } from 'react';
import Togglable from '../Togglable';
import BlogForm from './BlogForm';
import Blogs from './Blogs';

const BlogSection = () => {
	const newBlogRef = useRef();

	return (
		<div className='flex flex-col items-center justify-center'>
			<Togglable label='new note' ref={newBlogRef}>
				<h3>Create new note</h3>
				<BlogForm toggle={() => newBlogRef.current.toggleVisible()} />
			</Togglable>
			<Blogs />
		</div>
	);
};

export default BlogSection;
