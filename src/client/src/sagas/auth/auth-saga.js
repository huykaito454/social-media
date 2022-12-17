import { takeLatest } from "redux-saga/effects";
import handleAuthRegister, {
  handleAuthGetUser,
  handleAuthLogin,
  handleAuthLogOut,
  handleAuthRefreshToken,
} from "./auth-handle";
import {
  authGetUser,
  authLogin,
  authLogOut,
  authRefreshToken,
  authRegister,
} from "./auth-slice";
export default function* authSaga() {
  yield takeLatest(authRegister.type, handleAuthRegister);
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(authRefreshToken.type, handleAuthRefreshToken);
  yield takeLatest(authLogOut.type, handleAuthLogOut);
  yield takeLatest(authGetUser.type, handleAuthGetUser);
}
