import { createSlice } from '@reduxjs/toolkit';

const shipmentSlice = createSlice({
  name: 'shipment',

  initialState: {
    shipments: [],
    isUpdating: false,
    isGeneratingLabel: false,
    isGeneratingInvoice: false,
    isGeneratingManifest: false,
  },

  reducers: {
    SetIsUpdating(state, action) {
      state.isUpdating = action.payload.state;
    },
    UpdateShipment(state, action) {
      state.shipments = state.shipments.map((el) =>
        el._id !== action.payload.shipment._id ? el : action.payload.shipment
      );
    },
    FetchShipments(state, action) {
      state.shipments = action.payload.shipments;
    },
    SetIsGeneratingLabel(state, action) {
      state.isGeneratingLabel = action.payload.state;
    },
    SetIsGeneratingInvoice(state, action) {
      state.isGeneratingInvoice = action.payload.state;
    },
    SetIsGeneratingManifest(state, action) {
      state.isGeneratingManifest = action.payload.state;
    }
  },
});

export const shipmentActions = shipmentSlice.actions;
export default shipmentSlice;
