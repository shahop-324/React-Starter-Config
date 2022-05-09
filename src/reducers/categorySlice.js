import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',

  initialState: {
    categories: [],
    isBulkUpdating: false,
    isBulkImporting: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
  },

  reducers: {
    SetIsBulkImporting(state, action) {
      state.isBulkImporting = action.payload.state;
    },
    SetIsBulkUpdating(state, action) {
      state.isBulkUpdating = action.payload.state;
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
    CreateCategories(state, action) {
      state.categories = state.categories.concat(action.payload.categories);
    },
    CreateCategory(state, action) {
      state.categories.push(action.payload.category);
    },
    UpdateCategory(state, action) {
      state.categories = state.categories.map((el) =>
        el._id !== action.payload.category._id ? el : action.payload.category
      );
    },
    FetchCategories(state, action) {
      state.categories = action.payload.categories;
    },
    DeleteCategory(state, action) {
      state.categories = state.categories.filter((el) => el._id !== action.payload.categoryId);
    },
    DeleteMultipleCategory(state, action) {
        state.categories = state.categories.filter((el) => !action.payload.ids.includes(el._id));
    }
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice;
