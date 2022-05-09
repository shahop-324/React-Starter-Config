import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',

  initialState: {
    user: {},
    isUpdatingUser: false,
    isUpdatingPassword: false,
    error: false,
  },

  reducers: {
    FetchUser(state, action) {
      state.user = action.payload.user;
    },
    SetIsUpdatingUser(state, action) {
      state.isUpdatingUser = action.payload.state;
    },
    SetIsUpdatingPassword(state, action) {
      state.isUpdatingPassword = action.payload.state;
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice;
