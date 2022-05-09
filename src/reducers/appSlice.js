import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',

  initialState: {
    subname: [],
    error: false,
  },

  reducers: {
    FetchSubnames(state, action) {
      state.subname = action.payload.subname;
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice;
