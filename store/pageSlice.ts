import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  activePage: number;
}

const initialState: IinitialState = {
  activePage: 1,
};

const productSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = productSlice.actions;
export default productSlice.reducer;
