import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transaction',

  initialState: {
    transactions: [],
    payouts: [],
    refunds: [],
  },

  reducers: {
    FetchTransactions(state, action) {
      state.transactions = action.payload.transactions;
    },
    FetchPayouts(state, action) {
      state.payouts = action.payload.payouts;
    },
    FetchRefunds(state, action) {
      state.refunds = action.payload.refunds
    }
  },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice;
