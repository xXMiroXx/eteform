import Link from "next/link";
import Styles from "@/styles/Button.module.scss";
export default function Button({ link, type, children }: any) {

    const Btn = () => {
        return (
            <button className={`${Styles.btn} ${Styles["btn-primary"]}`}>
                {children}
            </button>
        );
    };

    if (link)
        return <Link href={link}><a>{Btn()}</a></Link>
    return Btn();
}