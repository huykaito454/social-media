import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../actions/userAction";
const initialState = {
  user: [],
  loading: false,
  error: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});
export default userSlice.reducer;
