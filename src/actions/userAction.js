import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getUser = createAsyncThunk(
  "user/getUser",
  async (query, thunkAPI) => {
    const rs = await axios.get("https://randomuser.me/api/");
    return rs;
  }
);
