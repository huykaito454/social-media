import { call, put } from "redux-saga/effects";
import {
  requestAuthGetUser,
  requestAuthLogin,
  requestAuthRefreshToken,
  requestAuthRegister,
} from "../../services/auth";
import { logOut, saveToken } from "../../utils/auth";
import { toastError, toastSuccess } from "../../utils/handleToastResponse";
import { authUpdateUser } from "./auth-slice";

export default function* handleAuthRegister({ payload }) {
  try {
    const { data } = yield call(requestAuthRegister, payload);
    if (data?.status === 200) {
      toastSuccess(data?.message);
    }
  } catch (error) {
    toastError(error?.response?.data?.message);
  }
}
function* handleAuthLogin({ payload }) {
  try {
    const { data } = yield call(requestAuthLogin, payload);
    if (data?.status === 200) {
      saveToken(data.accessToken, data.refreshToken);
      yield call(handleAuthGetUser, { payload: data.accessToken });
      window.location.reload(false);
    }
  } catch (error) {
    toastError(error?.response?.data?.message);
  }
}
function* handleAuthGetUser({ payload }) {
  try {
    const { data } = yield call(requestAuthGetUser, payload);
    if (data.status === 200) {
      yield put(
        authUpdateUser({
          user: data.data,
          accessToken: payload,
        })
      );
    }
  } catch (error) {}
}
function* handleAuthRefreshToken({ payload }) {
  try {
    const { data } = yield call(requestAuthRefreshToken, payload);
    if (data.status === 200) {
      saveToken(data.accessToken, data.refreshToken);
      yield call(authUpdateUser, {
        payload: { accessToken: data.accessToken },
      });
      yield call(handleAuthGetUser, { payload: data.accessToken });
    } else {
      yield handleAuthLogOut();
    }
  } catch (error) {}
}
function* handleAuthLogOut() {
  yield put(
    authUpdateUser({
      user: null,
      accessToken: null,
    })
  );
  logOut();
}
export {
  handleAuthLogin,
  handleAuthGetUser,
  handleAuthLogOut,
  handleAuthRefreshToken,
};
