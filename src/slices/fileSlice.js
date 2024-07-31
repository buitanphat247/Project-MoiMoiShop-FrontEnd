import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  image: [],
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setImage: (state, action) => {
      return {
        ...state,
        image: [...state.image, action.payload],
      };
    },
    setNewListImage: (state, action) => {
      return {
        ...state,
        image: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setImage, setNewListImage } = fileSlice.actions;

export default fileSlice.reducer;
