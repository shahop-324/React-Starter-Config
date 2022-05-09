import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'review',

  initialState: {
    reviews: [],
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
    CreateReview(state, action) {
      state.reviews.push(action.payload.review);
    },
    UpdateReview(state, action) {
      state.reviews = state.reviews.map((el) =>
        el._id !== action.payload.review._id ? el : action.payload.review
      );
    },
    FetchReviews(state, action) {
      state.reviews = action.payload.reviews;
    },
    DeleteReview(state, action) {
      state.reviews = state.reviews.filter((el) => el._id !== action.payload.reviewId);
    },
  },
});

export const reviewActions = reviewSlice.actions;
export default reviewSlice;