import { ChangeEvent, useState } from "react";
import Styles from "./Footer.module.scss";

const Footer: React.FC<{ countries: { [ind: string]: string }[] }> = ({
  countries,
}) => {
  const [country, setCountry] = useState("UK");
  const countryChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };
  const currentCountry = countries.find((c) => c.country === country);

  return (
    <footer className={Styles.footer}>
      <div className={Styles.footer__controls}>
        <h2 className={Styles.footer__heading}>تواصل معنا</h2>
        <h3 className="heading">اختر الدولة الاقرب اليك</h3>

        <div className={Styles.contact__switch}>
          <select value={country} onChange={countryChangeHandler}>
            <option value="UK">بريطنيا</option>
            <option value="USA">أمريكا</option>
            <option value="Egypt">مصر</option>
          </select>
        </div>
      </div>
      <address dir="ltr" className={Styles.contact__address}>
        {currentCountry.address}
      </address>
    </footer>
  );
};
export default Footer;
