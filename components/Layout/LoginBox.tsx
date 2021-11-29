import BtnP from "@/components/buttons/BtnP";
import { FaUser } from "react-icons/fa";
import Styles from "@/styles/LoginBox.module.scss";
import Btn from "../UI/Btn";
export default function LoginBox() {
  return (
    <Btn color="primary">
      <div className={Styles.box}>
        <span className={Styles.icon}>
          <FaUser />
        </span>
        <span className={Styles.text}>تسجيل الدخول</span>
      </div>
    </Btn>
  );
}
