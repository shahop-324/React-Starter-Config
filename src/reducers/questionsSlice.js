import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
  name: 'question',

  initialState: {
    questions: [],
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
    CreateQuestion(state, action) {
      state.questions.push(action.payload.question);
    },
    UpdateQuestion(state, action) {
      state.questions = state.questions.map((el) =>
        el._id !== action.payload.question._id ? el : action.payload.question
      );
    },
    FetchQuestions(state, action) {
      state.questions = action.payload.questions;
    },
    DeleteQuestion(state, action) {
      state.questions = state.questions.filter((el) => el._id !== action.payload.questionId);
    },
  },
});

export const questionActions = questionSlice.actions;
export default questionSlice;