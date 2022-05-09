import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    isSignedIn: false,
    isSubmittingRegister: false,
    isSubmittingLogin: false,
    isSubmittingVerify: false,
    isReSendingOTP: false,
    isSubmittingForgotPassword: false,
    isSubmittingResetPassword: false,
    token: null,
    error: false,
  },

  reducers: {
    SignIn(state, action) {
      console.log(action.payload.token);
      state.token = action.payload.token;
      state.isSignedIn = true;
    },
    SignOut(state) {
      state.isSignedIn = false;
      state.token = null;
      state.isSignedIn = false;
    },
    SetIsSubmittingRegister(state, action) {
      state.isSubmittingRegister = action.payload.isSubmitting;
    },
    SetIsSubmittingLogin(state, action){
      state.isSubmittingLogin = action.payload.isSubmitting;
    },
    SetIsSubmittingVerify(state, action) {
      state.isSubmittingVerify = action.payload.isSubmitting;
    },
    SetIsReSendingOTP(state, action) {
      state.isReSendingOTP = action.payload.state;
    },
    SetIsSubmittingForgotPassword(state, action) {
      state.isSubmittingForgotPassword = action.payload.state;
    },
    SetIsSubmittingResetPassword(state, action) {
      state.isSubmittingResetPassword = action.payload.state;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice;
