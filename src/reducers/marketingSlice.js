import { createSlice } from '@reduxjs/toolkit';

const marketingSlice = createSlice({
  name: 'marketing',

  initialState: {
    campaigns: [],
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
    CreateCampaign(state, action) {
      state.campaigns.push(action.payload.campaign);
    },
    UpdateCampaign(state, action) {
      state.campaigns = state.campaigns.map((el) =>
        el._id !== action.payload.campaign._id ? el : action.payload.campaign
      );
    },
    FetchCampaigns(state, action) {
      state.campaigns = action.payload.campaigns;
    },
  },
});

export const marketingActions = marketingSlice.actions;
export default marketingSlice;