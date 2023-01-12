import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface counterState {
  value: number;
}

const initialState: counterState = {
  value: 10,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented(state) {
      state.value++;
    },
  },
});

export const { incremented } = counterSlice.actions;
export default counterSlice.reducer;
