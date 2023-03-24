import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import logo from "../../assets/img/logo.jpg";
import insta from "../../assets/img/insta.png";
import whatsapp from "../../assets/img/whatsapp.png";
import telegram from "../../assets/img/telegram.png";
import mail from "../../assets/img/mail.png";
import { useSelector } from "react-redux";

export default function Header() {
  const token = useSelector((state) => state.users.token);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <div className={styles.home}>
            <a className={styles.home_href} href="">
              Домой
            </a>
          </div>
          <div className={styles.menu}>
            <a className={styles.menu_href} href="">
              Меню
            </a>
          </div>
          <div className={styles.dostavka}>
            <a className={styles.dostavka_href} href="">
              Доставка
            </a>
          </div>
          <div className={styles.o_nas}>
            <a className={styles.o_nas_href} href="">
              О нас
            </a>
          </div>
        </div>
        <div className={styles.logo}>
          <Link to={"/"}>
            <img src={logo} alt="err" />
          </Link>
        </div>
        <div className={styles.svyaz}>
          <img className={styles.inst} src={insta} alt="" />
          <img className={styles.whatsapp} src={whatsapp} alt="" />
          <img className={styles.telegram} src={telegram} alt="" />
          <img className={styles.mail} src={mail} alt="" />
          <div className={styles.telefon}>+7(988) 908-88-45</div>
          {token ? (
            <div className={styles.butimg}>
              <Link to={"/personalarea"}>
                <button className={styles.vhod}>Мой кабинет</button>
              </Link>
            </div>
          ) : (
            <div className={styles.butimg}>
              <Link to={"/authorization"}>
                <button className={styles.vhod}>Войти</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
