import React from "react";
import Btn from "../UI/Btn/Btn";

import Item from "../UI/Item/Item";
import Styles from "./WhyUs.module.scss";

class WhyItem extends React.Component<{ head: string; icon: string }> {
  render() {
    const { head, icon, children } = this.props;
    return (
      <div className={Styles.why__item}>
        <h3 className={Styles["why__item-head"]}>
          <Item name={head} icon={icon} />
        </h3>
        <p className={Styles["why__item-body"]}>{children}</p>
      </div>
    );
  }
}

export default function WhyUs() {
  return (
    <div className={Styles.why}>
      <h2 className="heading center-text">لماذانحن؟</h2>
      <div className={Styles.why__features}>
        <WhyItem head="الخبره والدعم" icon="FaHeadset">
          فريق عملنا المتميز سيوفر لك اجراءات سهلة بدون اي تعقد وخدمات متميزة مع
          دعم فني علي مدار الساعه لاستقبال اي استفسارات والرد عليها.
        </WhyItem>
        <WhyItem head="مرونة الإجراءت" icon="FaCogs">
          سهولة الإجراءات وسرعة التنفيذ في مدة زمنية قصيرة بدون طلب أوراق أو
          تصديقات حيث يمكنك التسجيل فقط بصورة جواز سفرك.
        </WhyItem>
        <WhyItem head="الامتيازات الضريبية" icon="FaFileInvoiceDollar">
          تتميز بريطانيا بأنها إحدى مناطق جذب الشركات الدولية لما تقدمه من
          امتيازات ضريبية في حالة عدم مزاولة نشاط داخلها.
        </WhyItem>
        <WhyItem head="الحماية والخصوصية" icon="FaShieldAlt">
          إمكانية التسجيل بدون بيانات خاصة أو حساسة مع وجود خصوصية تامة حول
          معلومات المؤسسين.
        </WhyItem>
        <WhyItem head="الثقة والإنتشار" icon="FaBullhorn">
          سهولة الانتشار والحصول على الثقة في الأسواق العالمية كشركة بريطانية
          مسجلة في بريطانيا أكبر دول العالم في الاقتصاد والاستثمار.
        </WhyItem>
        <WhyItem head="بدون رأس مال" icon="FaHandHoldingUsd">
          لا يوجد حد أدنى لرأس المال وغير مطلوب ضمان أو إثبات أو إيداع أي مبالغ
          لتأسيس الشركة ، فقط رسوم التسجيل.
        </WhyItem>
        <WhyItem head="أنشطة متعددة" icon="FaChartLine">
          إمكانية مزاولة العديد من الأنشطة المختلفة تحت نفس الشركة بدون الحاجة
          إلى اجراءات معقدة ، حيث يتم ذلك فقط بناء على قرار إداري داخلي للشركة.
        </WhyItem>
      </div>
    </div>
  );
}
