import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DATABASE_URL } from "../services/firebase";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default orderSlice.reducer;