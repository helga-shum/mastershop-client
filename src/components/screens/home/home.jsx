import React, { useEffect, useRef } from "react";
import Card from "./card";
import styles from "../home/home.module.css";
import FirstHeading from "../../ui/heading/firstHeading";
import SecondHeading from "../../ui/heading/secondHeading";
import Heading from "../../ui/heading";
import ProductMainSlide from "../../ui/productMainSlide";
import ProductSlider from "../../ui/productSlider";
import Button from "../../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { getCards } from "../../store/cards";
import Paginate from "../pagination/Paginate";
import Search from "../../ui/header/search";

const Home = () => {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const dispatch = useDispatch();
  const {
    sizeFilter,
    minPrice,
    maxPrice,
    fabricFilter,
    brandFilter,
    sortType,
    categoryId,
    currentPage,
    searchValue,
  } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(
      getCards({
        sizeFilter,
        minPrice,
        maxPrice,
        fabricFilter,
        brandFilter,
        sortType,
        categoryId,
        currentPage,
        searchValue,
      })
    );
  }, [
    sizeFilter,
    minPrice,
    maxPrice,
    fabricFilter,
    brandFilter,
    sortType,
    categoryId,
    currentPage,
    searchValue,
  ]);

  const { entities: cards } = useSelector((state) => state.cards);

  console.log(cards);
  return (
    <>
      <main>
        <ProductMainSlide />
        <Heading appearance="mainPage">
          <FirstHeading>Super value deals</FirstHeading>
          <FirstHeading>On all products</FirstHeading>
          <SecondHeading>Save more with coupons & up to 70% off!</SecondHeading>
          <Button appearance="ctvBlue" onClick={handleClick}>
            Show Now
          </Button>
        </Heading>

        <Search />
        <Paginate />
        {cards.length == 0 ? (
          <SecondHeading>Nothing found...</SecondHeading>
        ) : (
          <section ref={ref} className={styles.container}>
            {cards?.map((card) => (
              <Card card={card} key={card.id} />
            ))}
          </section>
        )}

        <ProductSlider />
      </main>
    </>
  );
};

export default Home;
