import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DATABASE_URL } from "../services/firebase";

const initialState = {
  addresses: [],
  selectedAddress: null,
  loading: false,
  error: null,
};
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async () => {
    const userId = localStorage.getItem("userId");

    const response = await fetch(
      `${DATABASE_URL}/addresses/${userId}.json`
    );

    const data = await response.json();

    if (!data) {
      return [];
    }

    const loadedAddresses = [];

    for (const key in data) {
      loadedAddresses.push({
        id: key,
        ...data[key],
      });
    }

    return loadedAddresses;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
  .addCase(fetchAddresses.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchAddresses.fulfilled, (state, action) => {
    state.loading = false;
    state.addresses = action.payload;
  })
  .addCase(fetchAddresses.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });
  }
  ,
});

export default addressSlice.reducer;