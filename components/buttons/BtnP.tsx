import { ReactChild } from "react";
import Btn from "./Btn";
import Styles from "@/styles/Button.module.scss";

export default function BtnP({ children }: any) {
    return (
        <Btn clickHandler={() => { }} className={Styles["btn-primary"]} >
            {children}
        </Btn>
    )
}