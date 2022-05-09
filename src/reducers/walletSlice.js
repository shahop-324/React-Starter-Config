import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',

  initialState: {
    transactions: [],
    error: false,
  },

  reducers: {
    FetchTransactions(state, action) {
      state.transactions = action.payload.transactions;
    },
  },
});

export const walletActions = walletSlice.actions;
export default walletSlice;
