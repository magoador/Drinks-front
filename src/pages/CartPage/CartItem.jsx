import React from "react";

import styles from "./Cart.module.scss";

const CartItem = ({
  item,
  index,
  handleDeleteItemFromBasket,
  setTotalPrice,
  totalPrice,
}) => {
  const [count, setCount] = React.useState(item.count);
  const price = item.item.price;

  const handleMinus = () => {
    setCount(count - 1);
    setTotalPrice(totalPrice - price * count);
  };

  const handlePlus = () => {
    setCount(count + 1);
    setTotalPrice(totalPrice + price * count);
  };

  return (
    <div className={styles.cart_item} key={index}>
      <div className={styles.itemImg}>
        <img
          width={80}
          height={80}
          src={`http://localhost:4000/${item.item.image}`}
          alt=""
        />
      </div>
      <div className={styles.itemName}>{item.item.name}</div>
      <div className={styles.item_counter}>
        <div className={styles.item_plus} id={styles.item_action}>
          <button disabled={count <= 1} onClick={handleMinus}>
            -
          </button>
        </div>
        <div className={styles.itemCount}>{count}шт</div>
        <div className={styles.item_minus} id={styles.item_action}>
          <button onClick={handlePlus}>+</button>
        </div>
      </div>
      <div className={styles.itemPrice}>{price}₽</div>
      <div className={styles.itemPrice}>{price * count}₽</div>
      <div className={styles.itemDelete}>
        <button onClick={() => handleDeleteItemFromBasket(item._id)}>x</button>
      </div>
    </div>
  );
};

export default CartItem;
