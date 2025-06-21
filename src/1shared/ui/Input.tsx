import clsx from "clsx";

import style from "./Input.module.css";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export function Input(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return <input {...props} className={clsx(style.Input, props.className)} />;
}
