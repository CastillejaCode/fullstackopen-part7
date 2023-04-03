import { useSelector } from 'react-redux';
import UserInfo from './UserInfo';

const Users = () => {
  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);

  const countBlogs = (id) => {
    return blogs.filter((blog) => blog.user.id === id).length;
  };

  return (
    <div>
      <UserInfo />
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>Blogs created</th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <th key={user.id}>{user.name}</th>
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
