import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const Notification = () => {
  const [message, dispatch] = useContext(NotificationContext);
  if (!message) return null;
  return <h2>{message}</h2>;
};

export default Notification;
