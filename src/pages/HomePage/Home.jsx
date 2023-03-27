import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Home.module.scss";
import { fetchProduct } from "../../redux/slices/productSlice";
import { fetchUsers } from "../../redux/slices/userSlice";
import { addProductToCart, fetchCart } from "../../redux/slices/cartSlice";
import Napitki from "./Napitki";
import bag_icon from "../../assets/img/bag_icon.png";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loggedUser = useSelector((state) => state.users.loggedUser?.id);
  const userCart = useSelector((state) => state.cart.cart);
  const [totalPrice, setTotalPrice] = React.useState(0);

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchUsers());
    dispatch(fetchCart(loggedUser));
  }, [dispatch]);

  if (!products) {
    return "Error";
  }

  const handleAddProductToCart = (item, price) => {
    setTotalPrice(totalPrice + price);
    console.log(totalPrice);
    dispatch(addProductToCart({ item, id: userCart?._id }));
  };

  return (
    <div className={styles.home}>
      {userCart?.items?.length > 0 && (
        <Link to={`/cart/${loggedUser}`}>
          <div className={styles.cart_link}>
            <div className={styles.cart_totalPrice}>
              = {userCart?.totalPrice}₽
            </div>
            <div className={styles.cart_img}>
              <img width={50} src={bag_icon} alt="" />
            </div>
            <div className={styles.cart_itemsCount}>
              {userCart?.items.length}
            </div>
          </div>
        </Link>
      )}
      <h1 className={styles.textMenu}>Burger Menu</h1>
      <div className={styles.divCointener}>
        {products.map((item, index) => {
          if (item.category.name === "Бургеры")
            return (
              <div className={styles.divCointenerCard} key={index}>
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
                      <button
                        onClick={() =>
                          handleAddProductToCart(item._id, item.price)
                        }
                      >
                        Добавить в корзину
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
        })}
        <div className={styles.divCointenerKombo}>
          {products.map((item, index) => {
            if (item.category.name === "Комбо") {
              return (
                <div className={styles.hover_text_one} key={index}>
                  <figure className={styles.effect_text_three}>
                    <img
                      className={styles.imgKombo}
                      src={`http://localhost:4000/${item.image}`}
                      alt=""
                    />
                    <figcaption>
                      <h3>
                        {item.name} <br />
                        {item.price}₽
                      </h3>
                      <p className={styles.expo}>{item.expo}</p>
                      <p>
                        {userCart?.items?.find(
                          (items) => items.item._id === item._id
                        ) ? (
                          <button className={styles.btn}>В корзине</button>
                        ) : (
                          <button
                            className={styles.btn}
                            onClick={() => handleAddProductToCart(item._id)}
                          >
                            Добавить в корзину
                          </button>
                        )}
                      </p>
                    </figcaption>
                  </figure>
                </div>
              );
            }
          })}
        </div>
      </div>
      <Napitki handleAddProductToCart={handleAddProductToCart} />
    </div>
  );
}

export default Home;
