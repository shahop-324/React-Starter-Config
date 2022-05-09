import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',

  initialState: {
    images: [],
    error: false,
  },

  reducers: {
    FetchImages(state, action) {
      state.images = action.payload.images;
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice;
