import { createSlice } from "@reduxjs/toolkit";
import {
  handleAuthLogin,
  handleGetUserInfo,
  handleRefreshToken,
} from "../actions/authAction";
const initialState = {
  user: undefined,
  accessToken: null,
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
      })
      .addCase(handleGetUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(handleRefreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      });
  },
});
export const { authUpdateUser } = authSlice.actions;
export default authSlice.reducer;