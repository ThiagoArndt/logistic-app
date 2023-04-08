import { createContext, useState, useEffect } from "react";

export interface NotificationInterface {
  status: string | null | undefined;
  message: string | null | undefined;
}

interface NotificationContextInterface {
  notification: NotificationInterface | null | undefined;
  hideNotification: () => void;
  showNotification: (notificationData: NotificationInterface) => void;
}

const NotificationContext = createContext<NotificationContextInterface | null>(
  null
);

export function NotificationContextProvider(children?: React.ReactNode) {
  const [notification, setNotification] = useState<
    NotificationInterface | null | undefined
  >(null);

  useEffect(() => {
    if (
      notification &&
      (notification.status === "success" || notification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  function showNotificationHandler(notificationData: NotificationInterface) {
    setNotification({
      message: notificationData.message,
      status: notificationData.status,
    });
  }

  function hideNotificationHandler() {
    setNotification(null);
  }

  const context: NotificationContextInterface = {
    notification: notification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
