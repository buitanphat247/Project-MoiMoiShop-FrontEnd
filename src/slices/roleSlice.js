import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  switches: [],
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    handleSwitches: (state, action) => {
      const { id, checked } = action.payload;
      const existingSwitchIndex = state.switches.findIndex(
        (item) => item.id === id
      );

      if (existingSwitchIndex !== -1) {
        // Nếu phần tử đã tồn tại, cập nhật checked
        state.switches[existingSwitchIndex].checked = checked;
      } else {
        // Nếu phần tử chưa tồn tại, thêm mới vào mảng switches
        state.switches.push({ id, checked });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleSwitches } = roleSlice.actions;

export default roleSlice.reducer;
