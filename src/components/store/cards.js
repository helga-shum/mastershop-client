import { createAction, createSlice } from "@reduxjs/toolkit";
import CardsService from "../services/cardsService";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    entities: [],
    countPages: 0,
    isLoading: true,
    error: null,
  },
  reducers: {
    setCountPages(state, action) {
      state.countPages = action.payload;
    },
    cardsRequested: (state) => {
      state.isLoading = true;
    },
    cardsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    cardsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    cardCreated: (state, action) => {
      state.entities = [action.payload, ...state.entities];
    },
    cardDeleted: (state, action) => {
      state.entities = state.entities.filter((c) => c.id !== action.payload);
    },
    cardUpdateSuccessed: (state, action) => {
      const cardId = action.payload.id;
      state.entities[state.entities.findIndex((c) => c.id === cardId)] =
        action.payload;
    },
  },
});

const { reducer: cardsReducer, actions } = cardsSlice;
const {
  cardsRequested,
  cardsReceved,
  cardsRequestFailed,
  cardCreated,
  cardDeleted,
  cardUpdateSuccessed,
  setCountPages,
} = actions;

const addCardRequested = createAction("cards/addCardRequested");
const deleteCardRequested = createAction("cards/deleteCardRequested");
const updateCardFailed = createAction("cards/updateCardFailed");
const updateCardRequested = createAction("cards/updateCardRequested");

//getting all products
export const loadCardsList = () => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { content } = await CardsService.getAll();
    dispatch(cardsReceved(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};
//product creation(ADMIN)
export const createCard = (payload) => async (dispatch) => {
  dispatch(addCardRequested(payload));
  try {
    const { content } = await CardsService.create(payload);
    dispatch(cardCreated(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
  try {
    const { content } = await CardsService.getAll();
    console.log(content);
    dispatch(cardsReceved(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};
//product boost(ADMIN)
export const deleteCard = (cardId) => async (dispatch) => {
  dispatch(deleteCardRequested());
  try {
    const { content } = await CardsService.deleteCard(cardId);
    if (content === null) {
      dispatch(cardDeleted(cardId));
    }
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
  try {
    const { content } = await CardsService.getAll();
    dispatch(cardsReceved(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};
//product editing (ADMIN)
export const updateCard = (cardId, payload) => async (dispatch) => {
  dispatch(updateCardRequested());
  try {
    const { content } = await CardsService.updateCard(cardId, payload);
    dispatch(cardUpdateSuccessed({ id: cardId, ...content }));
  } catch (error) {
    dispatch(updateCardFailed(error.message));
  }
  try {
    const { content } = await CardsService.getAll();
    dispatch(cardsReceved(content));
  } catch (error) {
    dispatch(cardsRequestFailed(error.message));
  }
};

export const getCards =
  ({
    sizeFilter,
    minPrice,
    maxPrice,
    fabricFilter,
    brandFilter,
    sortType,
    categoryId,
    currentPage,
    searchValue,
  }) =>
  async (dispatch) => {
    dispatch(cardsRequested());
    console.log(sizeFilter);
    try {
      const { content } = await CardsService.getAllFiltered({
        sizeFilter,
        minPrice,
        maxPrice,
        fabricFilter,
        brandFilter,
        sortType,
        categoryId,
        currentPage,
        searchValue,
      });
      console.log(content);
      dispatch(cardsReceved(content.list));
      dispatch(setCountPages(Math.ceil(content.totalPages)));
    } catch (error) {
      dispatch(cardsRequestFailed(error.message));
    }
  };

export const getCardsLoadingStatus = () => (state) => state.cards.isLoading;

export default cardsReducer;
