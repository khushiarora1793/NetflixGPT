import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGPTSearch: false,
    movieResults: null,
    movieNames: null,
  },
  reducers: {
    toggleShowGPTSearch: (state, action) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    addGPTMovieResults: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    clearGPTSlice: (state, action) => {
      state.movieResults = null;
      state.movieNames = null;
      state.showGPTSearch = false;
    },
  },
});

export const { toggleShowGPTSearch, addGPTMovieResults, clearGPTSlice } =
  gptSlice.actions;
export default gptSlice.reducer;
