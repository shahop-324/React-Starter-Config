import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'store',

  initialState: {
    store: {},
    error: false,
    isUpadtingOrderFlow: false,
    isUpadtingShareMessage: false,
    isUpdatingPolicyPreference: false,
    isGeneratingPolicy: false,
    isUpdatingPreference: false,
    isSubmittingStoreSetup: false,
    isUpdatingPaymentSettings: false,
    isUpdatingFavicon: false,
    isUpdatingStoreSEO: false,
    isUpdatingSelfDeliveryZone: false,
    isUpdatingManageCharges: false,
    isUpdatingStoreTimings: false,
    isUpdatingPolicy: false,
    isUpdatingNotification: false,
    isUpdatingSocialLinks: false,
    isCreatingCheckoutField: false,
    isUpdatingCheckoutField: false,
    isDeletingCheckoutField: false,
    isCreatingStaff: false,
    isUpdatingStaff: false,
    isDeletingStaff: false,

    isCreatingSubscription: false,

    isUpdatingAmbience: false,
    isUpdatingOtherInfo: false,
    permissions: [],
  },

  reducers: {
    FetchStore(state, action) {
      state.store = action.payload.store;
    },
    UpdateStore(state, action) {
      state.store = action.payload.store;
    },
    SetIsGeneratingPolicy(state, action) {
      state.isGeneratingPolicy = action.payload.state;
    },
    SetIsUpdatingOrderFlow(state, action) {
      state.isUpadtingOrderFlow = action.payload.state;
    },
    SetIsUpdatingShareMessage(state, action) {
      state.isUpadtingShareMessage = action.payload.state;
    },
    SetIsUpdatingPolicyPreference(state, action) {
      state.isUpdatingPolicyPreference = action.payload.state;
    },
    SetIsUpdatingPreference(state, action) {
      state.isUpdatingPreference = action.payload.state;
    },
    SetIsUpdatingPaymentSettings(state, action) {
      state.isUpdatingPaymentSettings = action.payload.state;
    },
    SetIsSubmittingSteup(state, action) {
      state.isSubmittingStoreSetup = action.payload.isSubmitting;
    },
    SetIsUpdatingFavicon(state, action) {
      state.isUpdatingFavicon = action.payload.state;
    },
    SetIsUpdatingStoreSEO(state, action) {
      state.isUpdatingStoreSEO = action.payload.state;
    },
    SetIsUpdatingSelfDeliveryZone(state, action) {
      state.isUpdatingSelfDeliveryZone = action.payload.state;
    },
    SetIsUpdatingManageCharges(state, action) {
      state.isUpdatingManageCharges = action.payload.state;
    },
    SetIsUpdatingStoreTimings(state, action) {
      state.isUpdatingStoreTimings = action.payload.state;
    },
    SetIsUpdatingPolicy(state, action) {
      state.isUpdatingPolicy = action.payload.state;
    },
    SetIsUpdatingNotification(state, action) {
      state.isUpdatingNotification = action.payload.state;
    },
    SetIsUpdatingSocialLinks(state, action) {
      state.isUpdatingSocialLinks = action.payload.state;
    },
    SetIsCreatingCheckoutField(state, action) {
      state.isCreatingCheckoutField = action.payload.state;
    },
    SetIsUpdatingCheckoutField(state, action) {
      state.isUpdatingCheckoutField = action.payload.state;
    },
    SetIsDeletingCheckoutField(state, action) {
      state.isDeletingCheckoutField = action.payload.state;
    },
    SetIsCreatingStaff(state, action) {
      state.isCreatingStaff = action.payload.state;
    },
    SetIsUpdatingStaff(state, action) {
      state.isUpdatingStaff = action.payload.state;
    },
    SetIsDeletingStaff(state, action) {
      state.isDeletingStaff = action.payload.state;
    },
    SetIsUpdatingAmbience(state, action) {
      state.isUpdatingAmbience = action.payload.state;
    },
    SetIsUpdatingOtherInfo(state, action) {
      state.isUpdatingOtherInfo = action.payload.state;
    },
    SetIsCreatingSubscription(state, action) {
      state.isCreatingSubscription = action.payload.state;
    },
    FetchPermissions(state, action) {
      state.permissions = action.payload.permissions;
    },
  },
});

export const storeActions = storeSlice.actions;
export default storeSlice;
