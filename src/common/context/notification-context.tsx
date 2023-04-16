import { createContext, useState, useEffect, FC } from "react";

export interface NotificationInterface {
  status: string;
  message: string;
}

export type NotificationType = {
  status: string;
  message: string;
};

export const NotificationContext = createContext<{
  notification: NotificationInterface;
  hideNotification: () => void;
  showNotification: (value: NotificationInterface) => void;
}>({
  notification: { message: "hahaha", status: "error" },
  hideNotification: () => {},
  showNotification: ({ message, status }) => {},
});

export const NotificationContextProvider = (props: any) => {
  const [notification, setNotification] = useState<NotificationInterface>({
    message: "",
    status: "",
  });

  useEffect(() => {
    if (
      notification &&
      (notification.status === "success" || notification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setNotification({
          message: "",
          status: "",
        });
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
    setNotification({
      message: "",
      status: "",
    });
  }

  const context: any = {
    notification: notification,
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
