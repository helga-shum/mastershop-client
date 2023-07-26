import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardItem from "./cardItem";
import styles from "./cardPage.module.css";

import CardsService from "../../services/cardsService";

import { useDispatch, useSelector } from "react-redux";
import { loadCardsList } from "../../store/cards";

const CardPage = () => {
  
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadCardsList());
  }, []);
  const {entities: cards} = useSelector((state)=>state.cards);

  const [card, setCard] = useState({});
  const [error, setError] = useState(null);
  const [slides, setSlides] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [sizes, setSizes] = useState([]);
console.log(card)

  useEffect(() => {
    const getCard = async () => {
      try {
        const cardData = await CardsService.getById(id);
        console.log(cardData)
        setCard(cardData.content);
        setSlides(cardData.content.imageUrl)
        setMeasures(cardData.content.measures)
        setSizes(cardData.content.sizes)
      } catch (error) {
        errorCatcher(error);
      }
    };
    getCard();
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const getCard = async () => {
      try {
        const cardData = await CardsService.getById(id);
        console.log(cardData)
        setCard(cardData.content);
        setSlides(cardData.content.imageUrl)
        setMeasures(cardData.content.measures)
        setSizes(cardData.content.sizes)
      } catch (error) {
        errorCatcher(error);
      }
    };
    getCard();
   
  }, [id, cards]);

 

 

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      console.log(error);
      setError(null);
    }
  }, [error]);



  return (
    <>
     
      <CardItem slides={slides} card={card} sizes={sizes} measures={measures}/>
    </>
  );
};

export default CardPage;
