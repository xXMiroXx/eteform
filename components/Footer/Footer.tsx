import { ChangeEvent, useState } from "react";
import { ContactCountry } from "@/types/contacts";
import Styles from "./Footer.module.scss";
import Item from "../UI/Item";

const Footer: React.FC<{ countries: ContactCountry[] }> = ({ countries }) => {
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

        <div className={Styles.footer__switch}>
          <select value={country} onChange={countryChangeHandler}>
            <option value="UK">بريطنيا</option>
            <option value="USA">أمريكا</option>
            <option value="Egypt">مصر</option>
          </select>
        </div>
      </div>
      <div className={`${Styles.footer__contact} ${Styles.contact}`}>
        <address dir="ltr" className={Styles.contact__address}>
          <Item name={currentCountry?.address || ""} icon="FaLocationArrow" />
        </address>
        <div className={Styles.contact__phone}>
          <Item name="تليفون" icon="FaPhone" />
          {currentCountry?.phoneNumbers.join(" - ")}
        </div>
        <div className={Styles.contact__mail}>
          <Item name="ايميل" icon="FaMailBulk" />
          <a href={`mailto:${currentCountry?.email}`}>
            {currentCountry?.email}
          </a>
        </div>
        <div className={Styles.contact__whatsapp}>
          <Item name="واتس اب" icon="FaWhatsapp" />
          <a href={`https://wa.me/${currentCountry?.whatsapp}`}>
            {currentCountry?.whatsapp}
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
