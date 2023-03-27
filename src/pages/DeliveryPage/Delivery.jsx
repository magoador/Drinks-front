import React from "react";

import styles from "./Delivery.module.scss";

const Delivery = () => {
  return (
    <div className={styles.delivery}>
      <div className={styles.delivery_wrapper}>
        <div className={styles.delivery_bText}>Доставка</div>
        <div className={styles.delivery_row}>
          <div className={styles.delivery_column}>
            <div className={styles.deliveryInfo_row}>
              <div className={styles.deliveryInfo_bText}>Телефон:</div>
              <div className={styles.deliveryInfo_sText}>+7(988) 908-88-45</div>
            </div>
            <div className={styles.deliveryInfo_row}>
              <div className={styles.deliveryInfo_bText}>Режим работы:</div>
              <div className={styles.deliveryInfo_sText}>
                ПН – ВС с 10:00 до 22:00
              </div>
            </div>
            <div className={styles.deliveryInfo_row}>
              <div className={styles.deliveryRow}>
                <div className={styles.deliveryInfo_bText}>Доставка:</div>
                <div className={styles.deliveryInfo_sText}>
                  По тарифу такси.
                </div>
              </div>
              <div>При заказе от 1200₽ доставка бесплатная</div>
            </div>
            <div className={styles.deliveryInfo_row}>
              <div className={styles.deliveryInfo_bText}>Время доставки:</div>
              <div className={styles.deliveryInfo_sText}>от 60 минут</div>
            </div>
          </div>
          <div className={styles.delivery_column}>
            <div className={styles.deliveryCol_row}>
              <div className={styles.delivery_form}>
                <div className={styles.deliveryForm_bText}>
                  СТАНДАРТНАЯ ДОСТАВКА
                </div>
                <div className={styles.deliveryForm_sText}>
                  Сделайте заказ и получите его в течение 60 минут по указанному
                  вами адресу
                </div>
              </div>
              <div className={styles.delivery_form}>
                <div className={styles.deliveryForm_bText}>САМОВЫВОЗ</div>
                <div className={styles.deliveryForm_sText}>
                  Забирайте заказы из выбранного ресторана самостоятельно в
                  удобное время! Заказы оформляются не менее чем за 40 минут до
                  получения. Минимальная сумма заказа — не ограничена
                </div>
              </div>
            </div>
            <div className={styles.delivery_warning}>
              <div className={styles.warning_bText}>ВНИМАНИЕ</div>
              <div className={styles.warning_sText}>
                Время доставки может быть изменено. В случае изменения времени
                доставки наш оператор обязательно сообщит информацию при заказе.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
