import React, { useState, useEffect } from "react";
import styles from "./cardItem.module.css";
import Slider from "../../../ui/slider";
import Loading from "../../../ui/loading";
import HeartIcon from "../../../ui/heartIcon";
import BasketIcon from "../../../ui/basketIcon";
import { useFavorites } from "../../../utils/hooks/useFavorites";
import { useAuth } from "../../../utils/hooks/useAuth";
import Modal from "../../../ui/modal";
import useModal from "../../../utils/hooks/useModal";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createBasket } from "../../../store/basket";
import { changeStatus } from "../../../store/favorites";

const CardItem = ({ slides, card, measures, sizes}) => {
 const dispatch = useDispatch();

  const { currentUser } = useAuth();

  const { modalVariety, handleModalOpen, handleModalClose, modalOpen } =
    useModal();



console.log(card)
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
      <div className={styles.container}>
        {slides.length <= 0 ? (
          <div className={styles.slide}>
            <Loading />
          </div>
        ) : (
          <div className={styles.slide}>
            <Slider slides={slides} appearance={"percentagesLower"} />
          </div>
        )}

        <div className={styles.item}>
          <div className={styles.characteristics}>
            <h4 className={styles.title}>{card.title}</h4>
            <p className={styles.title}><b>Brand: </b>{card.brand}</p>
            <p className={styles.title}><b>Fabric: </b>{card.fabric}</p>
            <p className={styles.title}><b>Sizes: </b>{sizes.map((size)=>(
              <p>{size}</p>
            ))}</p>
            
            <h4 className={styles.title}>Measures: 
              <table class="styled-table">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Type</th>
                  </tr>
              </thead>
              <tbody>
              {measures.map((measure)=>(
                  <tr>
                      <td className={styles.table}>{measure.name}</td>
                      <td className={styles.table}>{measure.type}</td>
                  </tr>
                  ))}
              </tbody>
          </table>
        
            </h4>
            <p className={styles.title}>
              <b className={styles.title}>Description: </b>
              {card.description}
            </p>
          </div>
          <div className={styles.actionBlock}>
            {!currentUser?.admin ? (
              <>
                <HeartIcon
                  onClick={
                    currentUser
                      ? handleHeartIconClick
                      : () => handleModalOpen("signIn")
                  }
                  isActive={isFavorite}
                  cardItem
                />
                <h2>Price: {card.price} $</h2>
                <BasketIcon
                  onClick={
                    currentUser
                      ? handleBasketIconClick
                      : () => handleModalOpen("signIn")
                  }
                  isActive={isBasket}
                  cardItem
                />
              </>
            ) : (
              <h2 className={styles.price}>Price: {card.price} $</h2>
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          variety={modalVariety}
          isOpen={modalOpen}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

CardItem.propTypes = {
  slides: PropTypes.array,
  card: PropTypes.object,
};
export default CardItem;
