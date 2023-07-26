import { createAction, createSlice } from "@reduxjs/toolkit";
import FavoriteService from "../services/favoriteService.js";



const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    entities:[],
    isLoading: true,
    error: null,
    
  },
  reducers: {
    favoritesRequested: (state) => {
      state.isLoading = true;
    },
    favoritesReceved: (state, action) => {
      state.entities = action.payload;

      state.isLoading = false;
    },
    favoritesRecevedEmpty: (state) => {
      state.isLoading = false;
    },
    favoritesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
//add or remove from favorites
    changeLikeStatus: (state, action) => {
      const cardIndex = state.entities.findIndex((favCard) => favCard._id === action.payload._id);
      if (cardIndex === -1) {
        return void{
          ...state, 
          entities: [state.entities.push(action.payload)]
        }
      } else {
        return void{...state, 
          entities:[ state.entities.splice(cardIndex, 1)]
        }
       
      }
    },
  
  },
});
const { reducer: favoritesReducer, actions } = favoriteSlice;
const {
  favoritesRequested,
  favoritesReceved,
  favoritesRequestFailed,
  favoritesRecevedEmpty,
  changeLikeStatus
} = actions;

//get favorites
export const loadFavoritesList = () => async (dispatch) => {
  dispatch(favoritesRequested());
  try {
    const { content } = await FavoriteService.getAll();
    if(content){
      dispatch(favoritesReceved(content));
    }else{
      dispatch(favoritesRecevedEmpty());
    }
    
  } catch (error) {
    dispatch(favoritesRequestFailed(error.message));
  }
};
//add or remove from favorites
export const changeStatus = (item) => async (dispatch) => {
  dispatch(changeLikeStatus(item));
 
};




export default favoritesReducer;


