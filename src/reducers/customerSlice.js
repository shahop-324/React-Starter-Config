import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customer',

  initialState: {
    customers: [],
    isBulkUpdating: false,
    isBulkImporting: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isImporting: false,
    isSendingSMS: false,
    isAddingCoins: false,
  },

  reducers: {
    SetIsBulkUpdating(state, action) {
      state.isBulkUpdating = action.payload.state;
    },
    SetIsBulkImporting(state, action) {
      state.isBulkImporting = action.payload.state;
    },
    SetIsCreating(state, action) {
      state.isCreating = action.payload.state;
    },
    SetIsUpdating(state, action) {
      state.isUpdating = action.payload.state;
    },
    SetIsDeleting(state, action) {
      state.isDeleting = action.payload.state;
    },
    SetIsImporting(state, action) {
      state.isImporting = action.payload.state;
    },
    SetIsSendingSMS(state, action) {
      state.isSendingSMS = action.payload.state;
    },
    SetIsAddingCoins(state, action){
      state.isAddingCoins = action.payload.state;
    },
    CreateCustomers(state, action) {
      state.customers = state.customers.concat(action.payload.customers);
    },
    CreateCustomer(state, action) {
      state.customers.push(action.payload.customer);
    },
    CreateMultipleCustomer(state, action) {
      state.customers = state.customers.concat(action.payload.customers);
    },
    UpdateCustomer(state, action) {
      state.customers = state.customers.map((el) =>
        el._id !== action.payload.customer._id ? el : action.payload.customer
      );
    },
    FetchCustomers(state, action) {
      state.customers = action.payload.customers;
    },
    DeleteCustomer(state, action) {
      state.customers = state.customers.filter((el) => el._id !== action.payload.customerId);
    },
    DeleteMultipleCustomer(state, action) {
      state.customers = state.customers.filter((el) => !action.payload.ids.includes(el._id));
    },
  },
});

export const customerActions = customerSlice.actions;
export default customerSlice;
