import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger"
import userSlice from "../reducers/userSlice";
const reducer = combineReducers({
  user: userSlice,
});
const store = configureStore({
  reducer,
  // middleware: (gDM) => gDM().concat(logger),
});
export default store;
