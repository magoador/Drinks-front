import React from "react";

import styles from "./PersonalArea.module.scss";
import order_moreInfo from "../../assets/img/order_moreInfo.png";
import order_lessInfo from "../../assets/img/order_lessInfo.png";

const Order = ({ id, phone, number, date, address, totalPrice, items }) => {
  const [needMoreInfo, setNeedMoreInfo] = React.useState(false);
  return (
    <div className={styles.order} id={styles.pending} key={id}>
      {needMoreInfo ? (
        <div
          className={styles.order_moreInfoButton}
          onClick={() => setNeedMoreInfo(false)}
        >
          <img width={25} src={order_lessInfo} alt="" />
        </div>
      ) : (
        <div
          className={styles.order_moreInfoButton}
          onClick={() => setNeedMoreInfo(true)}
        >
          <img width={25} src={order_moreInfo} alt="" />
        </div>
      )}
      <div className={styles.orderNumberAndDate_row}>
        <div className={styles.orderNumber}>Заказ № {number}</div>
        <div className={styles.orderDate}>от {date}</div>
      </div>
      <div className={styles.orderInfo_row}>
        <div className={styles.order_address}>
          <div className={styles.orderInfo_bText}>Адрес доставки</div>
          <div className={styles.address_text}>
            {address ? address : "Самовывоз"}
          </div>
        </div>
        {phone && (
          <div className={styles.order_phone}>
            <div className={styles.orderInfo_bText}>Контактный номер</div>
            <div className={styles.phone_text}>{phone}</div>
          </div>
        )}
        <div className={styles.order_paymentMethod}>
          <div className={styles.orderInfo_bText}>Способ оплаты</div>
          <div className={styles.paymentMethod_text}>
            Наличными при доставке
          </div>
        </div>
        <div className={styles.order_status}>
          <div className={styles.orderInfo_bText}>Статус заказа</div>
          <div className={styles.status_text}>Готовится</div>
        </div>
        <div className={styles.order_totalPrice}>
          <div className={styles.orderInfo_bText}>Итого к оплате</div>
          <div className={styles.totalPrice_number}>{totalPrice}₽</div>
        </div>
      </div>
      {needMoreInfo && (
        <div className={styles.order_moreInfo}>
          {items.map((item) => {
            return <div className={styles.f}>{item.item.name}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default Order;
