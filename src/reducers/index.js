import { combineReducers } from "redux";

import snackbarSlice from "./snackbarSlice";
import notificationSlice from "./notificationSlice";

import appSlice from "./appSlice";

export default combineReducers({
  snackbar: snackbarSlice.reducer,
  notification: notificationSlice.reducer,

  app: appSlice.reducer,
});
