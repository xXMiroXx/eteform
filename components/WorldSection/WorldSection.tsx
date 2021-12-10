import Btn from "../UI/Btn/Btn";
import Pair from "../UI/Pair/Pair";

import Styles from "./WorldSection.module.scss";

export default function WroldSection() {
  return (
    <Pair
      className={Styles.world}
      image="/images/world/world.webp"
      alt="someone points to world"
    >
      <div className={Styles.world__content}>
        <h2 className="heading">الحدود ﻻ تهم!</h2>
        <h3 className="sub-heading">
          مع خطط الاسعار الدوليه موقعك في اي دوله لا يؤثر علي هاوية شركتك{" "}
        </h3>
        <p>
          سجل شركتك في المملكة المتحدة ، بعنوان عمل قوي في وسط لندن وابدأ بأقوى
          أساس للنجاح. نحن نقدم تسجيلات تجارية دولية سهلة وموثوقة لغير المقيمين
          في المملكة المتحدة.
        </p>
        <Btn className={Styles.world__btn} color="primary">
          سجل الان
        </Btn>
      </div>
    </Pair>
  );
}
