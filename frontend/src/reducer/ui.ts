import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Family } from "../types/types";
import { IProduct } from "../api/products/getProducts";

// Define a type for the slice state
interface uiState {
  selectedProduct: IProduct | null;
  selectedFamily: Family | null;
}

// Define the initial state using that type
const initialState: uiState = {
  selectedProduct: null,
  selectedFamily: null,
};

export const uiReducer = createSlice({
  name: "ui",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<IProduct>) => {
      state.selectedProduct = action.payload;
    },
    cleanProduct: (state) => {
      state.selectedProduct = null;
    },
    selectFamily: (state, action: PayloadAction<Family>) => {
      state.selectedFamily = action.payload;
    },
    cleanFamily: (state) => {
      state.selectedFamily = null;
    },
  },
});

export const { selectProduct, cleanProduct, selectFamily, cleanFamily } =
  uiReducer.actions;

export default uiReducer.reducer;
