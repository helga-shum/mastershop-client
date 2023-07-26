import qs from "qs";
import httpService from "../httpService";
const cardsEndpoint = "cards/";

const CardsService = {
  //Getting all products
  getAllFiltered: async ({sizeFilter,
    minPrice,
    maxPrice,
    fabricFilter,
    brandFilter,
    sortType,
    categoryId,
    currentPage,
    searchValue}) => {
    
    const { data } = await httpService.get(cardsEndpoint, 
      {params:{
      sizes: sizeFilter.toString(), 
      fabric:fabricFilter.toString(), 
      brand:brandFilter.toString(), 
      lowPrice: minPrice,  
      highPrice: maxPrice, 
      categoryId,
      sortType,
      searchValue,
      currentPage
    }});
    return data;
  },

  getAll: async () => {
    const { data } = await httpService.get(cardsEndpoint + "all/");
    return data;
  },

  //Getting the product using Id
  getById: async (id) => {
    const { data } = await httpService.get(cardsEndpoint + id);
    return data;
  },
  //adding product(ADMIN)
  create: async (payload) => {
    const { data } = await httpService.post(cardsEndpoint, payload);
    return data;
  },
//delete product(ADMIN)
  deleteCard: async (cardId) => {
    const { data } = await httpService.delete(cardsEndpoint + cardId);
    return data;
  },
 //product editing (ADMIN)
  updateCard: async (cardId, payload) => {
    const { data } = await httpService.patch(cardsEndpoint + cardId, payload);
    return data;
  },
};

export default CardsService;
