import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs = () => {
	const blogs = useSelector(({ blogs }) => blogs);

	return (
		<div className='mt-4 rounded-md bg-slate-100/40 p-4 font-medium text-slate-100 shadow-md'>
			<ul className='flex flex-col gap-3 text-xl'>
				{blogs.map((blog) => (
					<li
						className='w-fit rounded-r-lg bg-slate-700/70 px-2 shadow-xl transition-all duration-100 hover:bg-slate-900'
						key={blog.id}>
						<Link to={`/blogs/${blog.id}`}>
							{blog.title} by {blog.author}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Blogs;
