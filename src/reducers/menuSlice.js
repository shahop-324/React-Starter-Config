import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',

  initialState: {
    menus: [],
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
    FetchMenu(state, action) {
        state.menus = action.payload.menus;
    },
    CreateMenuItem(state, action) {
      state.menus.push(action.payload.menuItem);
    },
    UpdateMenuItem(state, action) {
      state.menus = state.menus.map((el) =>
        el._id !== action.payload.menuItem._id ? el : action.payload.menuItem
      );
    },
    DeleteMenuItem(state, action) {
      state.menus = state.menus.filter((el) => el._id !== action.payload.menuId);
    },
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice;