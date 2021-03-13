import { createSlice } from '@reduxjs/toolkit';

export const algorithmSlice = createSlice({
  name: 'algorithm',
  initialState: {
    value: null,
  },
  reducers: {
    selection: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selection } = algorithmSlice.actions;

export const selectAlgorithm = (state) => state.algorithm.value;

export default algorithmSlice.reducer;
