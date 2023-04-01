import { useSelector } from 'react-redux';

const Notification = () => {
	if (error === null) return null;
	return <h2>{error}</h2>;
};

export default Notification;
