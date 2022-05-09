import { createSlice } from '@reduxjs/toolkit';

const deliverySlice = createSlice({
  name: 'delivery',

  initialState: {
    pickupPoints: [],
    deliveries: [],
    isCreatingPickupPoint: false,
    isUpdatingPickupPoint: false,
    isDeletingPickupPoint: false,
    isUpdatingDelivery: false,
  },

  reducers: {
    SetIsCreatingPickupPoint(state, action) {
      state.isCreatingPickupPoint = action.payload.state;
    },
    SetIsUpdatingPickupPoint(state, action) {
      state.isUpdatingPickupPoint = action.payload.state;
    },
    SetIsUpdatingDelivery(state, action) {
      state.isUpdatingDelivery = action.payload.state;
    },
    SetIsDeletingPickupPoint(state, action) {
      state.isDeletingPickupPoint = action.payload.state;
    },
    CreatePickupPoint(state, action) {
      state.pickupPoints.push(action.payload.pickupPoint);
    },
    UpdatePickupPoint(state, action) {
      state.pickupPoints = state.pickupPoints.map((el) =>
        el._id !== action.payload.pickupPoint._id ? el : action.payload.pickupPoint
      );
    },
    UpdateDelivery(state, action) {
      state.deliveries = state.deliveries.map((el) =>
        el._id !== action.payload.deliveries._id ? el : action.payload.deliveries
      );
    },
    FetchPickupPoints(state, action) {
      state.pickupPoints = action.payload.pickupPoints;
    },
    DeletePickupPoint(state, action) {
      state.pickupPoints = state.pickupPoints.filter((el) => el._id !== action.payload.pickupPointId);
    },
    DeleteMultiplePickupPoints(state, action) {
      state.pickupPoints = state.pickupPoints.filter((el) => !action.payload.ids.includes(el._id));
    },
  },
});

export const deliveryActions = deliverySlice.actions;
export default deliverySlice;
