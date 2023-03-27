import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearCart,
  deleteItemFromCart,
  fetchCart,
  itemMinus,
  itemPlus,
} from "../../redux/slices/cartSlice";
import { addOrder, fetchOrders } from "../../redux/slices/orderSlice";
import { fetchUsers } from "../../redux/slices/userSlice";

import styles from "./Cart.module.scss";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const [needDelivey, setNeedDelivey] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const { id } = useParams();

  React.useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCart(id));
    dispatch(fetchOrders({ user: id }));
  }, [dispatch]);

  const cart = useSelector((state) => state.cart?.cart);
  const orders = useSelector((state) => state.orders.orders);

  const [totalPrice, setTotalPrice] = React.useState(cart?.totalPrice);

  console.log(cart);
  if (!cart) {
    return "Loading...";
  }
  const { items } = cart;

  if (!items) {
    return "Loading...";
  }

  const handleDeleteItemFromBasket = (itemId) => {
    dispatch(deleteItemFromCart({ id, itemId }));
  };

  const handleClearCart = () => {
    dispatch(clearCart(id));
  };

  const handleItemPlus = (itemId, price) => {
    // dispatch(itemPlus({ id, itemId, price }));
  };

  const handleItemMinus = (itemId, price, count) => {
    // if (count > 1) {
    //   dispatch(itemMinus({ id, itemId, price }));
    // }
  };

  const handleDisabledCheckoutButton = () => {
    if (
      (needDelivey && (!address || !phone)) ||
      (!needDelivey && phone.length !== 14)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleCheckoutOrder = () => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timezone: "UTC",
    };
    const date = new Date().toLocaleString("ru", options).replace(" г. в", "");
    dispatch(
      addOrder({
        user: id,
        number: orders.length + 1,
        items: items,
        date,
        address,
        phone,
        totalPrice: totalPrice,
      })
    );
    dispatch(clearCart(id));
    setAddress("");
    setPhone("");
  };

  const handleNeedDelivery = () => {
    setNeedDelivey(!needDelivey);
    setAddress("");
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart_wrapper}>
        <div className={styles.cart_textRow}>
          <div className={styles.cart_bText}>Корзина</div>
          <div className={styles.cart_clear}>
            <button onClick={handleClearCart} disabled={!items.length}>
              Очистить корзину
            </button>
          </div>
        </div>
        {items.length ? (
          <div className={styles.cart_items}>
            {items.map((item, index) => (
              <CartItem
                item={item}
                index={index}
                handleDeleteItemFromBasket={handleDeleteItemFromBasket}
                handleItemPlus={handleItemPlus}
                handleItemMinus={handleItemMinus}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
              />
            ))}
          </div>
        ) : (
          <div className={styles.cartEmptyText}>Корзина пуста</div>
        )}
        <div className={styles.totalPrice}>Итого: {totalPrice}₽</div>
        <div className={styles.cart_checkoutItems}>
          <button
            onClick={handleCheckoutOrder}
            disabled={handleDisabledCheckoutButton()}
          >
            Оформить заказ
          </button>
        </div>
        <div className={styles.phone_form}>
          <div className={styles.phone_bText}>Введите контактный номер:</div>
          <div className={styles.phoneInput}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <span>8-928-888-8888</span>
          </div>
        </div>
        <div className={styles.deliveryForm}>
          {needDelivey && items.length ? (
            <>
              <div
                className={styles.needDeliveyText}
                onClick={handleNeedDelivery}
              >
                Мне не нужна доставка
              </div>
              <div className={styles.cart_address}>
                <div className={styles.adress_bText}>Введите адрес:</div>
                <div className={styles.addressInput}>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span>г. Грозный ул. Трошева, 7</span>
                </div>
                <div className={styles.deliveryPrice}>
                  Доставка по тарифу такси!
                </div>
              </div>
            </>
          ) : (
            <div
              className={styles.needDeliveyText}
              id={styles.needDeliverySText}
              onClick={() => setNeedDelivey(!needDelivey)}
            >
              Мне нужна доставка
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
