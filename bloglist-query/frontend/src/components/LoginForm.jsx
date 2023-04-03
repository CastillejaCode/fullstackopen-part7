import { useContext } from 'react';
import UserContext from '../UserContext';
import NotificationContext from '../NotificationContext';
import { setToken } from '../requests';
import loginService from '../services/login';

const LoginForm = () => {
  const [user, setUser] = useContext(UserContext);

  const [notification, notificationDispatch] = useContext(NotificationContext);
  const setNotification = (message, seconds = 5) => {
    notificationDispatch({
      type: 'ADD_NOTIFICATION',
      payload: `${message}`
    });
    setTimeout(
      () => notificationDispatch({ type: 'DELETE_NOTIFICATION' }),
      seconds * 1000
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      const response = await loginService.login({ username, password });
      window.localStorage.setItem('user', JSON.stringify(response));
      setToken(response.token);
      setUser({ type: 'LOGIN', payload: response });
    } catch (exception) {
      setNotification('Wrong Credentials!', 3);
    }
  };
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' name='username' />
        </div>
        <div>
          password
          <input type='password' name='password' />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
