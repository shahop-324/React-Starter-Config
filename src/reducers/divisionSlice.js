import { createSlice } from '@reduxjs/toolkit';

const divisionSlice = createSlice({
  name: 'division',

  initialState: {
    divisions: [],
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
    CreateDivision(state, action) {
      state.divisions.push(action.payload.division);
    },
    UpdateDivision(state, action) {
      state.divisions = state.divisions.map((el) =>
        el._id !== action.payload.division._id ? el : action.payload.division
      );
    },
    FetchDivisions(state, action) {
      state.divisions = action.payload.divisions;
    },
    DeleteDivision(state, action) {
      state.divisions = state.divisions.filter((el) => el._id !== action.payload.divisionId);
    },
    DeleteMultipleDivision(state, action) {
        state.divisions = state.divisions.filter((el) => !action.payload.ids.includes(el._id));
    }
  },
});

export const divisionActions = divisionSlice.actions;
export default divisionSlice;