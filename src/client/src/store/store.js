import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/authSlice";
import logger from "redux-logger";
const reducer = combineReducers({
  auth: authSlice,
});
const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger),
});
export default store;
