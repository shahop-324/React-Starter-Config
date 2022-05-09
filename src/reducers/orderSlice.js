import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',

  initialState: {
    orders: [],
    recentOrders: [],
    abondonedCarts: [],
    error: false,
  },

  reducers: {
    FetchOrders(state, action) {
      state.orders = action.payload.orders;
    },
    FetchRecentOrders(state, action) {
      state.recentOrders = action.payload.recentOrders;
    },
    FetchAbondonedCarts(state, action) {
      state.abondonedCarts = action.payload.abondonedCarts;
    },
    UpdateOrder(state, action) {
      state.orders = state.orders.map((el) => el._id !== action.payload.order._id ? el : action.payload.order);
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
