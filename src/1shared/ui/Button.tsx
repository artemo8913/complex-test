import clsx from "clsx";
import { PropsWithChildren } from "react";

import style from "./Button.module.css";

interface ButtonProps extends PropsWithChildren {
  className?: string;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.isDisabled}
      onClick={props.onClick}
      className={clsx(style.Button, props.className)}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
