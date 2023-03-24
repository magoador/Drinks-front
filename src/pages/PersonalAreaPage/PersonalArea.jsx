import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import { logOut } from "../../redux/slices/userSlice";

import styles from "./PersonalArea.module.scss";

const PersonalArea = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const loggedUserId = useSelector((state) => state.users.loggedUser.id);

  React.useEffect(() => {
    dispatch(fetchOrders({ user: loggedUserId }));
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.personalArea}>
      <div className={styles.personalArea_wrapper}>
        <div className={styles.personalArea_bText}>Личный кабинет</div>
        <div className={styles.personalArea_row}>
          <div className={styles.OrdersForm}>
            <div className={styles.ordersForm_bText}>Мои заказы</div>
            <div className={styles.orders}>
              {orders.map((order) => {
                return (
                  <div className={styles.order} id={styles.pending}>
                    <div className={styles.orderNumberAndDate_row}>
                      <div className={styles.orderNumber}>
                        Заказ № {order.number}
                      </div>
                      <div className={styles.orderDate}>от {order.date}</div>
                    </div>
                    <div className={styles.orderInfo_row}>
                      <div className={styles.order_address}>
                        <div className={styles.orderInfo_bText}>
                          Адрес доставки
                        </div>
                        <div className={styles.address_text}>
                          {order.address ? order.address : "Самовывоз"}
                        </div>
                      </div>
                      {order.phone && (
                        <div className={styles.order_phone}>
                          <div className={styles.orderInfo_bText}>
                            Контактный номер
                          </div>
                          <div className={styles.phone_text}>{order.phone}</div>
                        </div>
                      )}
                      <div className={styles.order_paymentMethod}>
                        <div className={styles.orderInfo_bText}>
                          Способ оплаты
                        </div>
                        <div className={styles.paymentMethod_text}>
                          Наличными при доставке
                        </div>
                      </div>
                      <div className={styles.order_status}>
                        <div className={styles.orderInfo_bText}>
                          Статус заказа
                        </div>
                        <div className={styles.status_text}>Готовится</div>
                      </div>
                      <div className={styles.order_totalPrice}>
                        <div className={styles.orderInfo_bText}>
                          Итого к оплате
                        </div>
                        <div className={styles.totalPrice_number}>
                          {order.totalPrice}₽
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.changeInfoSideBar}>
            <div className={styles.changeInfoSideBar_text} id="">
              Мои данные
            </div>
            <div className={styles.changeInfoSideBar_text} id={styles.active}>
              Мои заказы
            </div>
            <div
              className={styles.changeInfoSideBar_text}
              id=""
              onClick={handleLogOut}
            >
              Выйти из аккаунта
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalArea;
