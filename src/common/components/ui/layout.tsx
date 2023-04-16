import NotificationContext from "@/src/common/context/notification-context";
import React, { Fragment, useContext } from "react";
import NotificationDisplay from "./notificationDisplay";

function Layout(props: any) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;
  return (
    <Fragment>
      <main>{props.children}</main>
      {notificationCtx && (
        <NotificationDisplay
          message={activeNotification.message}
          status={activeNotification.status}
        ></NotificationDisplay>
      )}
    </Fragment>
  );
}

export default Layout;
