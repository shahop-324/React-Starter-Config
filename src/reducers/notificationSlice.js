import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",

  initialState: {
    toggle: true, // true || false
    toastMessage: null, // Message that needs to be shown to users
  },

  reducers: {
    setNotification(state, action) {
      state.toggle = !state.toggle;
      state.toastMessage = action.payload.message;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
