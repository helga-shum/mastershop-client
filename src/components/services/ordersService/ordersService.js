import { calculateCurrentDate, calculateDeliveryDate } from "../../utils/calculateDeliveryDate";
import httpService from "../httpService";
import localStorageService from "../localStorageService";
const orderEndpoint = "order/";


const OrdersService = {
//Getting all user orders
  getAll: async () => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.get(orderEndpoint, {params:{userId}});
    return data;
  },
//change order delivery status
  changeOrder: async (orderId) => {
    const userId = localStorageService.getUserId();
    const { data } = await httpService.patch(orderEndpoint + orderId, {params:{userId}});
    return data;
  },
// create an order
  createOrder: async () =>{
    const currentDate = calculateCurrentDate();
    const deliveryDate = calculateDeliveryDate();
    const userId = localStorageService.getUserId();
    const { data } = await httpService.post(orderEndpoint + "checkout/",{currentDate, deliveryDate, userId});
    return data;
  }
 
};

export default OrdersService;
