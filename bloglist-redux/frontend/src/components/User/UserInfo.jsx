import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

const UserInfo = () => {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user);
	if (!user) return null;

	return (
		<div className='fixed right-0 top-0 m-2 flex items-center gap-3'>
			{user.name} is logged in
			<button
				className='rounded-md bg-slate-400 px-4 py-2'
				type='button'
				onClick={() => dispatch(logout())}>
				Logout
			</button>
		</div>
	);
};

export default UserInfo;
