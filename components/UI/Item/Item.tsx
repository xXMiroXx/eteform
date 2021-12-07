import { ItemType } from "@/types/ui-types";
import * as Icons from "react-icons/fa";
import Styles from "./Item.module.scss";

export default function Item({ name, icon, className }: ItemType) {
  return (
    <span className={`${className || Styles.item}`}>
      {name && <span className={Styles.item__name}>{name}</span>}
      {/* @ts-ignore-next-line */}
      {icon && <span className={Styles.item__icon}>{Icons[icon]()}</span>}
    </span>
  );
}
