import { MouseEventHandler, ReactNode } from "react";

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
      className={`btn ${color ? "btn--" + color : ""} ${className || ""}`}
    >
      {children}
    </button>
  );
}
