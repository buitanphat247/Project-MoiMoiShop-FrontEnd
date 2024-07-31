import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  openModelUpdate: false,
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    modelUpdate: (state, action) => {
      state.openModelUpdate = !action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { modelUpdate } = modelSlice.actions;

export default modelSlice.reducer;
