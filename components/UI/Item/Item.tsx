import { ItemType } from "@/types/ui-types";
import * as Icons from "react-icons/fa";
import Styles from "./Item.module.scss";

export default function Item({ name, icon, className }: ItemType) {
  return (
    <div className={`${className || Styles.item}`}>
      {/* @ts-ignore-next-line */}
      {icon && <span className={Styles.item__icon}>{Icons[icon]()}</span>}
      {name && <span className={Styles.item__name}>{name}</span>}
    </div>
  );
}
