import { useReducer, createContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.payload;
    case 'DELETE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

// const [notification, notificationDispatch] = useContext(NotificationContext);

// export const setNotification = (message, seconds) => {
//   notificationDispatch({ type: 'ADD_NOTIFICATION', payload: `${message}` });
//   notificationDispatch({ type: 'DELETE_NOTIFICATION' });
// };

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
