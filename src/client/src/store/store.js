import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";
import mySaga from "./mySaga";
import authSlice from "../sagas/auth/auth-slice";
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  auth: authSlice,
});
const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});
sagaMiddleware.run(mySaga);
export default store;
