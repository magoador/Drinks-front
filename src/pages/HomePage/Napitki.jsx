import styles from "./Home.module.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/slices/productSlice";
import { fetchUsers } from "../../redux/slices/userSlice";
import { addProductToCart, fetchCart } from "../../redux/slices/cartSlice";

function Napitki() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loggedUser = useSelector((state) => state.users.loggedUser?.id);
  const userCart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchUsers());
    dispatch(fetchCart(loggedUser));
  }, [dispatch]);

  if (!products) {
    return "Error";
  }

  const handleAddProductToCart = (item) => {
    dispatch(addProductToCart({ item, id: userCart?._id }));
  };

  return (
    <div>
      <h1 className={styles.textMenu}>Напитки</h1>
      <div className={styles.divCointener}>
        {products.map((item) => {
          if (item.category.name === "Напитки")
            return (
              <div className={styles.divCointenerCard}>
                <div>
                  <img
                    className={styles.img}
                    src={`http://localhost:4000/${item.image}`}
                    alt=""
                  />
                </div>
                <div className={styles.divOpisanieNapitki}>
                  <div>
                    <h1>{item.name}</h1>
                  </div>
                  <div className={styles.divPriceAndBtn}>
                    <h2>{item.price}₽</h2>
                    {userCart?.items?.find(
                      (items) => items.item._id === item._id
                    ) ? (
                      <button>В корзине</button>
                    ) : (
                      <button onClick={() => handleAddProductToCart(item._id)}>
                        Добавить в корзину
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default Napitki;
