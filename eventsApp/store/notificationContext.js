import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: (notification) => {},
  hideNotification: () => {},
});
export const NotificationContextProvider = () => {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [activeNotification]);

  const showNotificationHandler = (notification) => {
    setActiveNotification({
      title: notification.title,
      message: notification.message,
      status: notification.status,
    });
  };
  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };
  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
