import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicAxios } from "../api/axios";
import { saveToken } from "../utils/auth";
import { toastError, toastSuccess } from "../utils/handleToastResponse";
export const handleAuthLogin = createAsyncThunk(
  "user/handleAuthLogin",
  async (query, thunkAPI) => {
    try {
      const { data } = await publicAxios.post("/login", query);
      if (data?.status === 200) {
        saveToken(data.accessToken, data.accessToken);
        thunkAPI.dispatch(handleGetUserInfo(data.accessToken));
        toastSuccess(data?.message);
      }
      return data;
    } catch (error) {
      toastError(error?.response?.data?.message);
      return error?.response?.data;
    }
  }
);
export const handleAuthRegister = createAsyncThunk(
  "user/handleAuthRegister",
  async (query, thunkAPI) => {
    try {
      const { data } = await publicAxios.post("/register", query);
      if (data?.status === 200) {
        toastSuccess(data?.message);
      }
      return data;
    } catch (error) {
      toastError(error?.response?.data?.message);
      return error?.response?.data;
    }
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
