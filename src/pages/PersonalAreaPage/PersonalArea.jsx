import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../../redux/slices/orderSlice";
import { logOut } from "../../redux/slices/userSlice";
import styles from "./PersonalArea.module.scss";
import Order from "./Order";

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
              {orders.map((order) => (
                <Order
                  key={order._id}
                  id={order._id}
                  phone={order.phone}
                  number={order.number}
                  date={order.date}
                  address={order.address}
                  totalPrice={order.totalPrice}
                  items={order.items}
                  status={order.status}
                />
              ))}
            </div>
          </div>
          <div className={styles.changeInfoSideBar}>
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
