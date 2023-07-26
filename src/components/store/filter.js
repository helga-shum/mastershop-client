import { createSlice } from '@reduxjs/toolkit';
import { brands, fabrics, sizes, sort } from '../utils/data';





const initialState = {

  searchValue: '',
  categoryId: 0,
  currentPage: 0,
  sortType: sort[0].sort,
  sizeFilter: sizes,
  brandFilter: brands,
  minPrice:0,
  maxPrice:7500,
  fabricFilter: fabrics,

};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {

    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sortType;
      state.categoryId = Number(action.payload.categoryId);
      state.sizeFilter = action.payload.sizeFilter;
    },
    setSizeFilter(state, action) {
      state.sizeFilter.push(action.payload);
    },
    minusSizeFilter(state, action) {
      const sizeIndex = state.sizeFilter.indexOf(action.payload);
      if (sizeIndex !== -1) {
        state.sizeFilter.splice(sizeIndex, 1);
      }
    },
    setBrandFilter(state, action) {
      state.brandFilter.push(action.payload);
    },
    minusBrandFilter(state, action) {
      const sizeIndex = state.brandFilter.indexOf(action.payload);
      if (sizeIndex !== -1) {
        state.brandFilter.splice(sizeIndex, 1);
      }
    },
    setMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
    setFabricFilter(state, action) {
      state.fabricFilter.push(action.payload);
    },
    minusFabricFilter(state, action) {
      const sizeIndex = state.fabricFilter.indexOf(action.payload);
      if (sizeIndex !== -1) {
        state.fabricFilter.splice(sizeIndex, 1);
      }
    },
  },
});
const { reducer: filterReducer, actions } = filterSlice;
export const selectFilter = (state) => state.filterSlice;
export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSizeFilter,
  minusSizeFilter,
  setBrandFilter,
  minusBrandFilter,
  setMinPrice,
  setMaxPrice,
  cardsReceived,
  setFabricFilter,
  minusFabricFilter,
  setSearchValue,
} = actions;


export default filterReducer;
