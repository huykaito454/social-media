import { createSlice } from "@reduxjs/toolkit";
import {
  handleAuthLogin,
  handleAuthRegister,
  handleGetUserInfo,
  handleRefreshToken,
} from "../actions/authAction";
const initialState = {
  user: undefined,
  accessToken: null,
  status: null,
  message: "",
  loading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUpdateUser: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleAuthLogin.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.loading = false;
      })
      .addCase(handleAuthLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleGetUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(handleAuthRegister.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleAuthRegister.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.loading = false;
      })
      .addCase(handleRefreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      });
  },
});
export const { authUpdateUser } = authSlice.actions;
export default authSlice.reducer;
