import { MouseEventHandler, ReactChild, ReactChildren } from "react";

export type StandardBtnProps = {
  className?: string;
  clickHandler?: MouseEventHandler;
  children: ReactChild | ReactChildren;
};
