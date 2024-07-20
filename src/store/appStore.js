import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import moviesReducer from "../slice/moviesSlice";
import gptReducer from "../slice/gptSlice";
import configReducer from "../slice/configSlice";

const reducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
  gpt: gptReducer,
  config: configReducer,
});

const appStore = configureStore({
  reducer,
});

export default appStore;
