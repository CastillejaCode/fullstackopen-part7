import { useSelector } from 'react-redux';

const Notification = () => {
	const message = useSelector(({ notification }) => notification);
	if (!message) return null;
	return <h2 className='my-6 text-4xl'>{message}</h2>;
};

export default Notification;
