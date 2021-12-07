import { MouseEventHandler, ReactNode } from "react";

import Styles from "./Btn.module.scss";

type Props = {
  children: ReactNode;
  type?: "submit" | "button" | "reset";
  color?: string;
  className?: string;
  disabled?: boolean;
  handler?: MouseEventHandler;
};

export default function Btn({
  children,
  className,
  color,
  type,
  disabled,
  handler,
}: Props) {
  return (
    <button
      {...(disabled && { disabled: true })}
      onClick={handler || (() => {})}
      type={type || "button"}
      className={`${Styles.btn} ${color ? Styles["btn--" + color] : ""} ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
}
