import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "Snackbar",

  initialState: {
    open: null,
    severity: null,
    message: null,
  },

  reducers: {
    openSnackBar(state, action) {
      state.open = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    closeSnackBar(state) {
      console.log("This is getting executed")
        state.open = false;
        state.message = null;
    },
  },
});
export const snackbarActions = snackbarSlice.actions;
export default snackbarSlice;
