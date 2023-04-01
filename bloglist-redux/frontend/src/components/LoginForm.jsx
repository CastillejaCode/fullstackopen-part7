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
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={login}>
				<div>
					username
					<input
						type='text'
						name='username'
						// value={username}
						// onChange={handleUsernameChange}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						name='password'
						// value={password}
						// onChange={handlePasswordChange}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
