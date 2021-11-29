import { ItemType } from "@/types/ui-types";
import * as Icons from "react-icons/fa";

export default function Item({ name, icon, className }: ItemType) {
  return (
    <span className={`item ${className || ""}`}>
      {name && <span className="item__name">{name}</span>}
      {/* @ts-ignore-next-line */}
      {icon && <span className="item__icon">{Icons[icon]()}</span>}
    </span>
  );
}
