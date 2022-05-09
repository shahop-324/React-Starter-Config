import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',

  initialState: {
    products: [],
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isBulkImporting: false,
    isBulkUpdating: false,
    subtotal: 0,
    total: 2,
    discount: 0,
    shipping: 0,
    billing: null,
    filters: {
      gender: [],
      category: 'All',
      colors: [],
      priceRange: '',
      rating: '',
    },
    checkout: {
      activeStep: 0,
      cart: [],
      subtotal: 0,
      total: 0,
      discount: 0,
      shipping: 0,
      billing: null,
    },
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
    SetIsBulkImporting(state, action) {
      state.isBulkImporting = action.payload.state;
    },
    SetIsBulkUpdating(state, action) {
      state.isBulkUpdating = action.payload.state;
    },
    CreateProduct(state, action) {
      state.products.push(action.payload.product);
    },
    CreateProducts(state, action) {
      state.products = state.products.concat(action.payload.products);
    },
    UpdateProduct(state, action) {
      state.products = state.products.map((el) =>
        el._id !== action.payload.product._id ? el : action.payload.product
      );
    },
    FetchProducts(state, action) {
      state.products = action.payload.products;
    },
    DeleteProduct(state, action) {
      state.products = state.products.filter((el) => el._id !== action.payload.productId);
    },
    DeleteMultipleProduct(state, action) {
      state.products = state.products.filter((el) => !action.payload.ids.includes(el._id));
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
