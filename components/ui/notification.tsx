import { useContext } from "react";

import NotificationContext, {
  NotificationInterface,
} from "@/common/store/notification-context";

function Notification(props: NotificationInterface) {
  const notificationCtx = useContext(NotificationContext);

  const { message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = "bg-success-600";
  }

  if (status === "error") {
    statusClasses = "bg-danger-600";
  }

  if (status === "pending") {
    statusClasses = "bg-primary-600";
  }

  const activeClasses = `fixed bottom-0 left-0 h-20 w-full bg-gray-900 flex justify-between items-center text-white p-2 ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx!.hideNotification}>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
