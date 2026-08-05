import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DATABASE_URL } from "../services/firebase";

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default addressSlice.reducer;