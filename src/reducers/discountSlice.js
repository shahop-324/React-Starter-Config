import { createSlice } from '@reduxjs/toolkit';

const discountSlice = createSlice({
  name: 'discount',

  initialState: {
    discounts: [],
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
  },

  reducers: {
    SetIsCreating(state, action) {
      state.isCreating = action.payload.state;
    },
    SetIsUpdating(state, action) {
      state.isUpdating = action.payload.state;
    },
    SetIsDeleting(state, action) {
      state.isDeleting = action.payload.state;
    },
    CreateDiscount(state, action) {
      state.discounts.push(action.payload.discount);
    },
    UpdateDiscount(state, action) {
      state.discounts = state.discounts.map((el) =>
        el._id !== action.payload.discount._id ? el : action.payload.discount
      );
    },
    FetchDiscounts(state, action) {
      state.discounts = action.payload.discounts;
    },
    DeleteDiscount(state, action) {
      state.discounts = state.discounts.filter((el) => el._id !== action.payload.discountId);
    },
  },
});

export const discountActions = discountSlice.actions;
export default discountSlice;
