import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";

// Define a type for the slice state

interface uiState {
  selectedProduct: Product | null;
  selectedFamily: string;
}

// Define the initial state using that type
const initialState: uiState = {
  selectedProduct: null,
  selectedFamily: "",
};

export const counterSlice = createSlice({
  name: "ui",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
