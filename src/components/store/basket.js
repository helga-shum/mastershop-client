import { createSlice } from "@reduxjs/toolkit";

import BasketService from "../services/basketService";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    entities: [],
    totalPrice: 0,
    totalQuantity: 0,
    isLoading: true,
    error: null,
  },
  reducers: {
    basketRequested: (state) => {
      state.isLoading = true;
    },
    basketReceved: (state, action) => {
      state.entities = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.totalQuantity = action.payload.totalQuantity;
      state.isLoading = false;
    },
    basketRecevedEmpty: (state) => {
      state.isLoading = false;
    },
    basketRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    //increase item unit by one
    addItem(state, action) {
      const findItem = state.entities.find((obj) => obj._id == action.payload);
      findItem.quantity++;
      state.totalQuantity++;
      state.totalPrice += findItem.price;
    },
    //complete removal of a product unit
    removeItem(state, action) {
      const findItem = state.entities.find((obj) => obj._id == action.payload);
      console.log(findItem);
      state.totalQuantity -= findItem.quantity;
      state.totalPrice -= findItem.price * findItem.quantity;
      state.entities = state.entities.filter(
        (obj) => obj._id !== action.payload
      );
    },
    //reduce the item unit by one
    minusItem(state, action) {
      const findItem = state.entities.find((obj) => obj._id == action.payload);

      if (findItem) {
        findItem.quantity--;
        state.totalQuantity--;
        state.totalPrice -= findItem.price;
      }
    },
  },
});
const { reducer: basketReducer, actions } = basketSlice;
const {
  basketRequested,
  basketReceved,
  basketRequestFailed,
  basketRecevedEmpty,
  basketUpdateSuccessed,
  addItem,
  minusItem,
  removeItem,
} = actions;

export const loadBasketList = () => async (dispatch) => {
  dispatch(basketRequested());
  try {
    const response = await BasketService.getAll();
    console.log(response.content);
    if (response.content) {
      dispatch(basketReceved(response.content));
    } else {
      dispatch(basketRecevedEmpty());
    }
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};
//increase item unit by one
export const addBasketItem = (cardId) => async (dispatch) => {
  dispatch(addItem(cardId));
  try {
    await BasketService.increaseOne(cardId);
  } catch (error) {
    console.log(error);
  }
};
//create a cart
export const createBasket = (card) => async (dispatch) => {
  try {
    const response = await BasketService.createBasket(card._id);
    //const item = {itemId: card._id, title: card.title, image:card.imageUrl[0], description: card.description, quantity:1, price: card.price}
    dispatch(basketReceved(response.content));
    console.log(response.content);
  } catch (error) {
    console.log(error);
  }
};
//reduce the item unit by one
export const minusBasketItem = (cardId) => async (dispatch) => {
  dispatch(minusItem(cardId));
  try {
    await BasketService.decreaseOne(cardId);
  } catch (error) {
    console.log(error);
  }
};
//complete removal of a product unit
export const removeBasketItem = (cardId) => async (dispatch) => {
  dispatch(removeItem(cardId));
  try {
    await BasketService.delete(cardId);
  } catch (error) {
    console.log(error);
  }
};

export const getBasket = () => async (state) => {
  state.basket;
};
export const getBasketLoadingStatus = () => (state) => state.basket.isLoading;

export default basketReducer;
