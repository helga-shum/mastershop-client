import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./cards";

import basketReducer from "./basket";
import ordersReducer from "./orders";
import favoritesReducer from "./favorites";
import filterReducer from "./filter";

const rootReducer = combineReducers({
  cards: cardsReducer,
  basket:basketReducer,
  orders: ordersReducer,
  favorites: favoritesReducer,
  filters: filterReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
