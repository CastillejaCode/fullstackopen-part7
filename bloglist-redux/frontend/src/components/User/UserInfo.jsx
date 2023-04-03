import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  if (!user) return <h2>Loading...</h2>;

  return (
    <>
      {user.name} is logged in
      <button type='button' onClick={() => dispatch(logout())}>
        Logout
      </button>
    </>
  );
};

export default UserInfo;
