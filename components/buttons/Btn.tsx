import type { StandardBtnProps } from "@/types/button";
import Styles from "@/styles/Button.module.scss";
export default function Btn({
    className,
    clickHandler,
    children,
}: StandardBtnProps) {
    return (
        <button onClick={clickHandler} className={`${className} ${Styles.btn}`}>
            {children}
        </button>
    );
}
