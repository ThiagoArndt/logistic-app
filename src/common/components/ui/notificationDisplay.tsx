import { useContext } from "react";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import NotificationContext, {
  NotificationInterface,
} from "@/common/store/notification-context";
import { PuffLoader } from "react-spinners";

function NotificationDisplay(props: NotificationInterface) {
  //const notificationCtx = useContext(NotificationContext);

  const { message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = "bg-success-200 fadeUp ";
  }

  if (status === "error") {
    statusClasses = "bg-danger-200 fadeUp";
  }
  if (status === "pending") {
    statusClasses = "bg-primary-200 fadeUpLoading";
  }

  const activeClasses = `fixed flex px-3 gap-4 rounded-md bottom-12  h-12 ${statusClasses}`;

  return (
    <div className="flex justify-center">
      <div className={activeClasses}>
        {status === "success" && (
          <BsFillCheckCircleFill
            size={20}
            color="green"
            className="my-auto"
          ></BsFillCheckCircleFill>
        )}
        {status === "error" && (
          <BsXCircleFill
            size={20}
            color="red"
            className="my-auto"
          ></BsXCircleFill>
        )}
        {status === "pending" && (
          <PuffLoader size={20} color="blue" className="my-auto"></PuffLoader>
        )}
        <h1 className="text-1xl font-nunito my-auto">{message}</h1>
      </div>
    </div>
  );
}

export default NotificationDisplay;
