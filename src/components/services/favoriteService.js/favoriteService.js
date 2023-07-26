import httpService from "../httpService";
import localStorageService from "../localStorageService";
const orderEndpoint = "user/";

const FavoriteService = {
//Get featured items
  getAll: async () => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.get(orderEndpoint + "favorites", {params:{userId}});
    return data;
  },

};

export default FavoriteService;
