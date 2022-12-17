import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: undefined,
  accessToken: null,
  loading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action) => {
      return {
        ...state,
      };
    },
    authRegister: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    authGetUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    authUpdateUser: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    },
    authRefreshToken: (state, action) => ({}),
    authLogOut: (state, action) => ({}),
    authGetUser: (state, action) => ({}),
  },
});
export const {
  authUpdateUser,
  authLogin,
  authRegister,
  authGetUser,
  authRefreshToken,
  authLogOut,
} = authSlice.actions;
export default authSlice.reducer;
