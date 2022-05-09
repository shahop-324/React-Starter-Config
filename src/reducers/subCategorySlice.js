import { createSlice } from '@reduxjs/toolkit';

const subCategorySlice = createSlice({
  name: 'subCategory',

  initialState: {
    subCategories: [],
    isBulkUpdating: false,
    isBulkImporting: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
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
    CreateSubCategories(state, action) {
      state.subCategories = state.subCategories.concat(action.payload.subCategories);
    },
    CreateSubCategory(state, action) {
      state.subCategories.push(action.payload.subCategory);
    },
    UpdateSubCategory(state, action) {
      state.subCategories = state.subCategories.map((el) =>
        el._id !== action.payload.subCategory._id ? el : action.payload.subCategory
      );
    },
    FetchSubCategories(state, action) {
      state.subCategories = action.payload.subCategories;
    },
    DeleteSubCategory(state, action) {
      state.subCategories = state.subCategories.filter((el) => el._id !== action.payload.subCategoryId);
    },
    DeleteMultipleSubCategory(state, action) {
        state.subCategories = state.subCategories.filter((el) => !action.payload.ids.includes(el._id));
    }
  },
});

export const subCategoryActions = subCategorySlice.actions;
export default subCategorySlice;