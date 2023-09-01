import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../api/products/getProducts";
import { IFamily } from "../api/family/getFamily";

// Define a type for the slice state
interface uiState {
  selectedProduct: IProduct | null;
  selectedFamily: IFamily | null;
  tip: number;
}

// Define the initial state using that type
const initialState: uiState = {
  selectedProduct: null,
  selectedFamily: null,
  tip: 10,
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
    selectFamily: (state, action: PayloadAction<IFamily>) => {
      state.selectedFamily = action.payload;
    },
    cleanFamily: (state) => {
      state.selectedFamily = null;
    },
    changeTip: (state, action: PayloadAction<number>) => {
      state.tip = action.payload;
    },
  },
});

export const {
  selectProduct,
  cleanProduct,
  selectFamily,
  cleanFamily,
  changeTip,
} = uiReducer.actions;

export default uiReducer.reducer;
