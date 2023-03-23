import styles from "./Home.module.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/slices/productSlice";
import { fetchUsers } from "../../redux/slices/userSlice";
import { addProductToCart, fetchCart } from "../../redux/slices/cartSlice";

function Home() {
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
      <h1 className={styles.textMenu}>Burger Menu</h1>
      <div className={styles.divCointener}>
        {products.map((item) => {
          if (item.category.name === "Бургеры")
            return (
              <div className={styles.divCointenerCard}>
                <div>
                  <img
                    className={styles.img}
                    src={`http://localhost:4000/${item.image}`}
                    alt=""
                  />
                </div>
                <div className={styles.divOpisanie}>
                  <div>
                    <h1>{item.name}</h1>
                  </div>
                  <div>{item.expo}</div>
                  <div>{item.weight}гр.</div>
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
        <div className={styles.divCointenerKombo}>
          {products.map((item) => {
            if (item.category.name === "Комбо") {
              return (
                <div className={styles.hover_text_one}>
                  <figure className={styles.effect_text_three}>
                    <img
                      className={styles.imgKombo}
                      src={`http://localhost:4000/${item.image}`}
                      alt=""
                    />
                    <figcaption>
                      <h3>
                        {item.name} <h4>{item.price}₽</h4>
                      </h3>
                      <p className={styles.expo}>{item.expo}</p>
                      <p>
                        <button className={styles.btn}>
                          Добавить в корзину
                        </button>
                      </p>
                    </figcaption>
                  </figure>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
