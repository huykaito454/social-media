import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveToken } from "../utils/auth";
export const handleAuthLogin = createAsyncThunk(
  "user/handleAuthLogin",
  async (query, thunkAPI) => {
    const rs = {
      accessToken: "access_token",
      refreshToken: "refresh_token",
    };
    if (rs) {
      saveToken(rs.accessToken, rs.refreshToken);
      thunkAPI.dispatch(handleGetUserInfo(rs.accessToken));
    }
    return rs;
  }
);
export const handleGetUserInfo = createAsyncThunk(
  "user/handleGetUserInfo",
  async (accessToken, thunkAPI) => {
    const rs = {
      user: {
        email: "huy@gmail.com",
        name: "Nguyễn Trọng Huy",
      },
      accessToken: "access_token",
    };
    if (accessToken) {
      return rs;
    } else return;
  }
);
export const handleRefreshToken = createAsyncThunk(
  "user/handleRefreshToken",
  async (refreshToken, thunkAPI) => {
    if (refreshToken) {
      const rs = {
        accessToken: "access_token_new",
        refreshToken: "refresh_token_new",
      };
      if (rs) {
        saveToken(rs.accessToken, rs.refreshToken);
        thunkAPI.dispatch(handleGetUserInfo(rs.accessToken));
      }
    }
  }
);
