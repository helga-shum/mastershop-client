import React from "react";
import Heading from "../../ui/heading";
import FirstHeading from "../../ui/heading/firstHeading";
import SecondHeading from "../../ui/heading/secondHeading";
import Line from "../../ui/line";
import Button from "../../ui/button";
import styles from "./basket.module.css";
import { useAuth } from "../../utils/hooks/useAuth";

import Card from "../home/card";
import useModal from "../../utils/hooks/useModal";
import Modal from "../../ui/modal";


import { useSelector } from "react-redux";


const Basket = () => {

  const { modalVariety, handleModalOpen, handleModalClose, modalOpen } =useModal();
  const { currentUser } = useAuth();
  const  {entities:basketCards, totalPrice, totalQuantity}  = useSelector((state)=>state.basket);
 

  const orderData = {
    basketCards: basketCards,
    totalQuantity: totalQuantity,
    totalPrice: totalPrice,
    address: currentUser.address,
    
  };

  return (
    <>
      <Heading>
        <FirstHeading>YOUR BASKET</FirstHeading>
        {basketCards?.length === 0 && (
          <SecondHeading>It's empty here</SecondHeading>
        )}
      </Heading>
      {basketCards?.length !== 0 && (
        <>
          <section>
            {basketCards?.map((basket) => (
              <Card card={basket} key={basket.id} />
            ))}
          </section>
          <Line />
          <section>
            <h2>{`Number of goods: ${totalQuantity}  p.`}</h2>
            <h2 className={styles.total}>{`TOTAL: ${+totalPrice.toFixed(2)} $.`}</h2>
            <Button
              appearance="ctvBlueOrder"
              onClick={() => handleModalOpen("order")}
            >
             Checkout
            </Button>
          </section>
        </>
      )}
      {modalOpen && (
        <Modal
          variety={modalVariety}
          isOpen={modalOpen}
          onClose={handleModalClose}
          orderData={orderData}
        />
      )}
    </>
  );
};

export default Basket;
