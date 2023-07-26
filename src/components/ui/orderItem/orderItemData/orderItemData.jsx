import React from "react";
import styles from "./orderItemData.module.css";

import PropTypes from "prop-types";

const OrderItemData = ({ card }) => {


 
 const totalPrice = card.quantity*card.price

  return (
    <div className={styles.data}>
      <div>
       
        <div className={styles.price}>
          <h3 className={styles.count}>{`Quantity: ${card.quantity} p.`}</h3>
        </div>
        <h3 className={styles.text}>{`Price for 1 piece: ${card.price} p.`}</h3>
        <h3 className={styles.text}>{`Total: ${totalPrice} p.`}</h3>
      </div>
    </div>
  );
};

OrderItemData.propTypes = {
  card: PropTypes.object,
};
export default OrderItemData;
