import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
  name: 'page',

  initialState: {
    pages: [],
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
      if (!action.payload.state) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
    SetIsDeleting(state, action) {
      state.isDeleting = action.payload.state;
    },
    CreatePage(state, action) {
      state.pages.push(action.payload.page);
    },
    UpdatePage(state, action) {
      state.pages = state.pages.map((el) => (el._id !== action.payload.page._id ? el : action.payload.page));
    },
    FetchPages(state, action) {
      state.pages = action.payload.pages;
    },
    DeletePage(state, action) {
      state.pages = state.pages.filter((el) => el._id !== action.payload.pageId);
    },
  },
});

export const pageActions = pageSlice.actions;
export default pageSlice;