import httpService from "../httpService";
import localStorageService from "../localStorageService";

const userEndpoint = "user/";

const UserService = {
//get user
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
// create user
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload.id, payload);
    return data;
  },
//get current user
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },
 
//update to change user data
  updateCurrentUser: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    return data;
  }




};

export default UserService;
// update: async (payload) => {
//   const { data } = await httpService.patch(
//     userEndpoint + localStorageService.getUserId(),
//     payload
//   );
//   return data;
// },
