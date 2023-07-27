import React from "react";
import styles from "./basketItemData.module.css";
import { calculateDeliveryDate } from "../../../utils/calculateDeliveryDate";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addBasketItem, minusBasketItem } from "../../../store/basket";

const BasketItemData = ({ card }) => {
  const totalPrice = card.price * card.quantity;

  const deliveryDdate = calculateDeliveryDate();
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(addBasketItem(card._id));
  };
  const onClickMinus = () => {
    dispatch(minusBasketItem(card._id));
  };

  return (
    <div>
      <div>
        <h3 className={styles.text}>{`Delivery: ${deliveryDdate}`}</h3>
        <div className={styles.price}>
          <h3 className={styles.count}>{` ${card.quantity} p.`}</h3>
          <button onClick={onClickPlus}>
            <img
              className={styles.plus}
              src="/icons/actionIcons/plus.svg"
              alt="plus"
            />
          </button>
          <button
            onClick={onClickMinus}
            disabled={card.quantity == 1 ? true : false}
          >
            <img src="/icons/actionIcons/minus.svg" alt="minus" />
          </button>
        </div>
        <h3 className={styles.text}>{`Price for 1 piece: ${card.price} $.`}</h3>
        <h3 className={styles.text}>{`Total: ${+totalPrice.toFixed(2)} $.`}</h3>
      </div>
    </div>
  );
};

BasketItemData.propTypes = {
  card: PropTypes.object,
};
export default BasketItemData;
