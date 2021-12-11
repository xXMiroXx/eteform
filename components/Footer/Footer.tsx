import { ChangeEvent, useState } from "react";
import { ContactCountry } from "@/types/contacts";
import Styles from "./Footer.module.scss";
import Item from "../UI/Item/Item";
import { FaBars } from "react-icons/fa";

const Footer: React.FC<{ countries: ContactCountry[] }> = ({ countries }) => {
  const [country, setCountry] = useState("EG");
  const countryChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };
  const currentCountry = countries.find((c) => c.country === country);

  return (
    <footer className={Styles.footer}>
      <div className={Styles.footer__controlls}>
        <h2 className="heading">اختر الاقرب اليك</h2>
        <select
          className={Styles["footer__controlls-select"]}
          onChange={countryChangeHandler}
          value={country}
        >
          <option value="UK">بريطانيا🇬🇧</option>
          <option value="US">امريكا🇺🇸</option>
          <option value="EG">مصر🇪🇬</option>
        </select>
      </div>
      <div className={Styles.footer__contact}>
        <div className={Styles["footer__contact-address"]}>
          <div className={Styles["footer__contact-head"]}>
            <Item name="العنوان" icon="FaMapMarkedAlt" />
          </div>
          <div dir="ltr">{currentCountry?.address}</div>
        </div>
        <div className={Styles["footer__contact-times"]}>
          <div className={Styles["footer__contact-head"]}>
            <Item name="مواعيد العمل" icon="FaClock" />
          </div>
          <div>{currentCountry?.workingTime}</div>
        </div>
        <div className={Styles["footer__contact-phone"]}>
          <div className={Styles["footer__contact-head"]}>
            <Item name="الهواتف" icon="FaPhone" />
          </div>
          <div>
            {currentCountry?.phoneNumbers.map((num) => {
              return (
                <div key={num}>
                  <a target="_blank" dir="ltr" href={`tel:${num}`}>
                    {num}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div className={Styles["footer__contact-whatsapp"]}>
          <div className={Styles["footer__contact-head"]}>
            <Item name="وتساب" icon="FaWhatsappSquare" />
          </div>
          <div>
            <a
              dir="ltr"
              target="_blank"
              href={`https://wa.me/${currentCountry?.whatsapp}`}
            >
              {currentCountry?.whatsapp}
            </a>
          </div>
        </div>
        <div className={Styles["footer__contact-email"]}>
          <div className={Styles["footer__contact-head"]}>
            <Item name="ايميل" icon="FaEnvelope" />
          </div>
          <div>
            <a
              dir="ltr"
              target="_blank"
              href={`mailto:${currentCountry?.email}`}
            >
              {currentCountry?.email}
            </a>
          </div>
        </div>
      </div>
      <div className={Styles.footer__packages}>
        <h3 className="sub-heading">خطط الاسعار</h3>
        <ul>
          <li>package</li>
          <li>package</li>
          <li>package</li>
          <li>package</li>
        </ul>
      </div>
      <div className={Styles.footer__services}>
        <h3 className="sub-heading">الخدمات</h3>
        <ul>
          <li>services</li>
          <li>services</li>
          <li>services</li>
          <li>services</li>
        </ul>
      </div>
      <div className={Styles.footer__socials}>
        <Item icon="FaFacebook" />
        <Item icon="FaTwitter" />
        <Item icon="FaYoutube" />
      </div>
      <div className={Styles.footer__copyrights}>
        <p dir="ltr">
          &copy;eteform {new Date(Date.now()).getFullYear()} جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
};
export default Footer;
