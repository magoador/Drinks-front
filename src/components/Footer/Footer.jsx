import React from "react";
import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";
import location from "../../assets/img/img2/location.png";
import insta from "../../assets/img/img2/insta.png";
import whatsapp from "../../assets/img/img2/whatsapp.png";
import telegram from "../../assets/img/img2/telegram.png";
import mail from "../../assets/img/img2/mail.png";

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.divadres}>
          <div className={styles.esemb}>
            <img className={styles.location} src={location} alt="" />
            <div className={styles.adres}>г. Грозный, бульвар Эсембаева, 6</div>
          </div>
          <div className={styles.kabard}>
            <img className={styles.loc} src={location} alt="" />
            <div className={styles.adres2}>г. Грозный, ул. Кабардинская, 4</div>
          </div>
        </div>
        <div className={styles.drinks}>
          <div className={styles.footerLogo}>
            <a href="/">DRINKS</a>
          </div>
          <div className={styles.seti}>
            <Link to={"https://www.instagram.com/drinks_grozny/"}>
              <img className={styles.inst} src={insta} alt="" />
            </Link>
            <Link
              to={
                "https://api.whatsapp.com/message/ZFV3IFRSJ47UO1?autoload=1&app_absent=0"
              }
            >
              <img className={styles.whatsapp} src={whatsapp} alt="" />
            </Link>
            <Link to={"https://t.me/musaevyunus"}>
              <img className={styles.telegram} src={telegram} alt="" />
            </Link>
            <Link to={"https://gmail.com"}>
              <img className={styles.mail} src={mail} alt="" />
            </Link>
          </div>
        </div>
        <div className={styles.vkladki}>
          <a href="" className={styles.menu}>
            Меню
          </a>
          <a href="" className={styles.a_contacty}>
            Контакты
          </a>
          <a href="" className={styles.dostavka}>
            Доставка
          </a>
          <a href="" className={styles.vakansii}>
            Вакансии
          </a>
        </div>
      </div>
    </>
  );
}
