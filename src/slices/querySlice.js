import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  query: "",
  queryChange: "",
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    setQueryChange: (state, action) => {
      return {
        ...state,
        queryChange: action.payload,
      };
    },
    resetQuery: (state, action) => {
      return {
        ...state,
        query: action.payload.query,
        queryChange: action.payload.queryChange,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuery, setQueryChange, resetQuery } = querySlice.actions;

export default querySlice.reducer;
