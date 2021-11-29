// export type NavItem =
//   | { name: string; link: string; icon: string; id: string }
//   | { name: string; nestedList: NavItem[]; icon: string; id: string };

import { MouseEventHandler, ReactChild, ReactChildren } from "react";

export type NavItem = {
  name: string;
  link?: string;
  nestedList?: NavItem[];
  icon: string;
  id: string;
};

export type NavBtnProps = {
  name: string;
  icon: string;
  clickHandler?: MouseEventHandler;
};

export type NavLinkProps = { name: string; icon: string; link: string };

export type NavProps = {
  navList: NavItem[];
  children?: ReactChild;
};
