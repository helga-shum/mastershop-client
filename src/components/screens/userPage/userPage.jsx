import React, { useEffect, useState } from "react";
import Heading from "../../ui/heading";
import FirstHeading from "../../ui/heading/firstHeading";
import SecondHeading from "../../ui/heading/secondHeading";
import styles from "./userPage.module.css";
import Line from "../../ui/line";
import TextBlock from "../../ui/textBlock";
import { useAuth } from "../../utils/hooks/useAuth";
import { nanoid } from "nanoid";
import Order from "../order/order";
import { useSelector } from "react-redux";

const UserPage = () => {
  const { currentUser } = useAuth();
  const { orders } = useSelector((state) => state.orders);
  console.log(orders);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Heading>
        <FirstHeading>{currentUser?.userName?.toUpperCase()}</FirstHeading>
        <SecondHeading>WELCOME!</SecondHeading>
      </Heading>
      <section className={styles.userData}>
        <img src="/images/avatars/avatar5.svg" alt="avatar" />
        <TextBlock authData={currentUser} />
      </section>
      <Line />
      <section>
        <h2 className={styles.orderHeading}>Orders</h2>

        {orders?.length === 0 && <SecondHeading>It's empty here</SecondHeading>}
        {orders.map((order) => (
          <Order order={order} key={`${order._id}_${nanoid()}`} />
        ))}
      </section>
    </>
  );
};

export default UserPage;
