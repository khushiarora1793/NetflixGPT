import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    selectedLanguage: "en",
  },
  reducers: {
    switchLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    resetLanguage: (state, action) => {
      state.selectedLanguage = "en";
    },
  },
});

export const { switchLanguage, resetLanguage } = configSlice.actions;
export default configSlice.reducer;
