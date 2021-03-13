import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './player-slice';
import algorithmReducer from './algorithm-slice';

export default configureStore({
  reducer: {
    player: playerReducer,
    algorithm: algorithmReducer,
  },
});
