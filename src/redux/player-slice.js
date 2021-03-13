import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    value: false,
  },
  reducers: {
    play: (state) => {
      state.value = true;
    },
    pause: (state) => {
      state.value = false;
    },
  },
});

export const { play, pause } = playerSlice.actions;

export const selectPlayer = (state) => state.player.value;

export default playerSlice.reducer;
