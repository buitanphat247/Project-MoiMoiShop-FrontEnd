import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content_editor: "",
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setContentEditor: (state, action) => {
      return {
        ...state,
        content_editor: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setContentEditor } = editorSlice.actions;

export default editorSlice.reducer;
