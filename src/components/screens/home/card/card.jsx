import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useFavorites } from "../../../utils/hooks/useFavorites";

import ProductItem from "../../../ui/productItem";
import BasketItem from "../../../ui/basketItem";
import OrderItem from "../../../ui/orderItem";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createBasket } from "../../../store/basket";
import { changeStatus } from "../../../store/favorites";

const Card = ({ card }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const  {entities:favoriteCards}  = useSelector((state)=>state.favorites);
  const { handleFavoriteClick } = useFavorites();
  const isFavorite = favoriteCards.some((favCard) => favCard._id === card._id);
  const [heartIconclicks, setHeartIconClicks] = useState(isFavorite);
  const handleHeartIconClick = async () => {
    setHeartIconClicks(!heartIconclicks);
    dispatch(changeStatus(card));
    handleFavoriteClick(card)
  };

  const  {entities:basketCards}  = useSelector((state)=>state.basket);
  const isBasket = basketCards.some((basketCard) => basketCard.itemId === card._id);
  const [basketIconclicks, setBasketIconClicks] = useState(isBasket);
  const handleBasketIconClick = async () => { 
    setBasketIconClicks(!basketIconclicks)
    dispatch(createBasket(card));
    console.log("click")
  };


  return (
    <>
      <ProductItem
        currentPath={currentPath}
        currentUser={currentUser}
        card={card}

        isFavorite={isFavorite}
        isBasket={isBasket}
        handleHeartIconClick={handleHeartIconClick}
        handleBasketIconClick={handleBasketIconClick}
      />
      <BasketItem
        currentUser={currentUser}
        currentPath={currentPath}
        card={card}
        
      />
      <OrderItem
        currentUser={currentUser}
        currentPath={currentPath}
        card={card}
      />
    </>
  );
};

Card.propTypes = {
  card: PropTypes.object,
};
export default Card;
