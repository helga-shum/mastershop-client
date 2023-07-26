import React from "react";
import Heading from "../../ui/heading";
import FirstHeading from "../../ui/heading/firstHeading";
import SecondHeading from "../../ui/heading/secondHeading";
import Card from "../home/card";
import styles from "./favorites.module.css";

import { useSelector } from "react-redux";


const Favorites = () => {

 

  const  {entities:favoriteCards}  = useSelector((state)=>state.favorites);
  return (
    <>
      <Heading>
        <FirstHeading>FAVORITES</FirstHeading>
        {favoriteCards.length === 0 && (
          <SecondHeading>It's empty here</SecondHeading>
        )}
      </Heading>
      <section className={styles.container}>
        {favoriteCards &&
          favoriteCards.map((favorite) => (
            <Card card={favorite} key={favorite.id} />
          ))}
      </section>
    </>
  );
};

export default Favorites;
