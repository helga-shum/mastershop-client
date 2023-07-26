import httpService from "../httpService";
import localStorageService from "../localStorageService";
const basketEndpoint = "basket/";

const BasketService = {
  //get the cart
  getAll: async () => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.get(basketEndpoint, {params:{userId}});
    return data;
  },
  //Increase the unit of goods by one
  increaseOne: async (cardId) => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.patch(basketEndpoint + "add/"+ cardId, {userId});
    return data;
  },
  //Decrease the unit of goods by one
  decreaseOne: async (cardId) => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.patch(basketEndpoint + "remove/"+ cardId, {userId});
    return data;
    
  },
  //Complete removal of the item from the cart  
  delete: async (cardId) => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.delete(basketEndpoint + cardId, { params: {userId } });
    return data;
  },
//Create a cart
  createBasket: async (cardId) =>{
    const userId = localStorageService.getUserId();
    const { data } = await httpService.post(basketEndpoint + cardId, {userId });
    return data;
    
  }
 
};

export default BasketService;
