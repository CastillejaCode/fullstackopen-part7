import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
	const users = useSelector(({ users }) => users);
	const blogs = useSelector(({ blogs }) => blogs);

	const countBlogs = (id) => {
		return blogs.filter((blog) => blog.user.id === id).length;
	};

	return (
		<div>
			<table>
				<tbody>
					<tr>
						<th>Users</th>
						<th>Blogs created</th>
					</tr>
					{users.map((user) => {
						return (
							<tr key={user.id}>
								<th key={user.id}>
									<Link to={`/users/${user.id}`}> {user.name} </Link>
								</th>
								<th>{countBlogs(user.id)}</th>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
