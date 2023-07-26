import React from "react";
import { Link } from "react-router-dom";
import HeartIcon from "../heartIcon";
import TextBlock from "../textBlock";
import Button from "../button";
import styles from "./basketItem.module.css";
import BasketItemData from "./basketItemData";
import PropTypes from "prop-types";
import { removeBasketItem } from "../../store/basket";
import { useDispatch } from "react-redux";
import { useAuth } from "../../utils/hooks/useAuth";

const BasketItem = ({
  currentPath,
  card
}) => {
 
 
  const dispatch = useDispatch()
  const onClickRemove = () => {
    dispatch(removeBasketItem(card._id));
  };

  return (
    currentPath === "/basket" && (
      <section>
        <div className={styles.order}>
          <div className={styles.info}>
            <div className={styles.itemBasket}>
              <Link to={`/cards/${card.itemId}`}>
                <img
                  className={`${styles.image} ${styles.imageBasket}`}
                  src={card.image}
                  alt="product"
                />
              </Link>
            </div>
            <div className={styles.rightBlock}>
              <TextBlock {...card} />

              <div className={styles.data}>
                <BasketItemData card={card} />

                <div>
                  <Button appearance="ctvBlack" onClick={onClickRemove}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

BasketItem.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  currentPath: PropTypes.string,
  card: PropTypes.object,
  handleHeartIconClick: PropTypes.func,
  handleBasketIconClick: PropTypes.func,
  isFavorite: PropTypes.bool,
};
export default BasketItem;
