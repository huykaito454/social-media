import { all, fork } from "redux-saga/effects";
import authSaga from "../sagas/auth/auth-saga";
export default function* mySaga() {
  yield all([fork(authSaga)]);
}
