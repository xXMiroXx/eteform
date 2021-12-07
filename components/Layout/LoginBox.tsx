import BtnP from "@/components/buttons/BtnP";
import { FaUser } from "react-icons/fa";

import Btn from "../UI/Btn/Btn";
import Item from "../UI/Item/Item";

export default function LoginBox() {
  return (
    <Btn color="primary">
      <Item name="تسجيل الدخول" icon="FaUser" />
    </Btn>
  );
}
