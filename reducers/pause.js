import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: false,
};

export const pauseSlice = createSlice({
 name: 'pause',

  initialState,
 reducers: {
   audioPause: (state, action) => {
     state.value = action.payload;
   },
 },
});

export const { audioPause } = pauseSlice.actions;
export default pauseSlice.reducer;