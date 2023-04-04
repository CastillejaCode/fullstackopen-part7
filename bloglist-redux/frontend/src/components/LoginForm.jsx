import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
	const dispatch = useDispatch();
	const login = (event) => {
		event.preventDefault();
		try {
			const username = event.target.username.value;
			const password = event.target.password.value;
			dispatch(loginUser({ username, password }));
		} catch (error) {
			dispatch(setNotification('Wrong credentials!', 5));
		}
	};
	return (
		<div className=' flex flex-col justify-center'>
			<form onSubmit={login} className='flex flex-col items-center'>
				<div>
					<div className='mb-3 flex flex-col'>
						username
						<input
							className='rounded-md border-2 border-gray-400'
							type='text'
							name='username'
							// value={username}
							// onChange={handleUsernameChange}
						/>
					</div>
				</div>
				<div>
					<div className='mb-3 flex flex-col'>
						password
						<input
							className='rounded-md border-2 border-gray-400'
							type='password'
							name='password'
							// value={password}
							// onChange={handlePasswordChange}
						/>
					</div>
				</div>
				<button
					type='submit'
					className='w-fit rounded-md  bg-slate-600 px-3 py-1 text-xl text-gray-200 text-gray-900 shadow-md'>
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
