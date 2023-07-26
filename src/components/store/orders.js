import { createAction, createSlice } from "@reduxjs/toolkit";
import OrdersService from "../services/ordersService";



const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders:[],
    isLoading: true,
    error: null,
    
  },
  reducers: {
    orderRequested: (state) => {
      state.isLoading = true;
    },
    orderReceved: (state, action) => {
      state.orders=action.payload;
      state.isLoading = false;
    },
    orderRecevedEmpty: (state) => {
      state.isLoading = false;
    },
    orderRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  },
});
const { reducer: ordersReducer, actions } = ordersSlice;
const {
  orderRequested,
  orderReceved,
  orderRequestFailed,
  orderRecevedEmpty
} = actions;

const updateOrdersRequested = createAction("cards/updateOrdersRequested");



//receiving orders
export const loadOrdersList = () => async (dispatch) => {
  dispatch(orderRequested());
  try {
    const response = await OrdersService.getAll();
    console.log(response.content)
    if(response){
      dispatch(orderReceved(response.content));
    }else{
      dispatch(orderRecevedEmpty());
    }
    
  } catch (error) {
    dispatch(orderRequestFailed(error.message));
  }
};

//create an order
export const createOrder = () => async (dispatch) => {
  dispatch(updateOrdersRequested());
  try {
     const response= await OrdersService.createOrder();
     console.log(response)
     if(response){
      dispatch(orderReceved(response.content));
    }else{
      dispatch(orderRecevedEmpty());
    }
     
  } catch (error) {
    console.log(error);
  }
};
//change delivery status
export const changeStatus = (orderId) => async (dispatch) => {
  try {
    const {content} = await OrdersService.changeOrder(orderId);
    if(content){
      dispatch(orderReceved(content));
    }else{
      dispatch(orderRecevedEmpty());
    }
  } catch (error) {
    console.log(error);
  }
};


export default ordersReducer;


