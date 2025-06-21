import clsx from "clsx";
import { ToastType } from "react-hot-toast";

import style from "./Notification.module.css";

interface INotificationProps {
  type: ToastType;
  message: string | null;
  icon?: React.ReactNode;
  className?: string;
}

export default function Notification(props: INotificationProps) {
  return (
    <div className={clsx(style.Notification, style[props.type], props.className)}>
      {props.icon && <div className={style.Icon}>{props.icon}</div>}
      {props.message}
    </div>
  );
}
