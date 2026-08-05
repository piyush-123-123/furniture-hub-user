import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DATABASE_URL } from "../services/firebase";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (order) => {
    const userId = localStorage.getItem("userId");

    const response = await fetch(
      `${DATABASE_URL}/orders/${userId}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );

    const data = await response.json();

    return {
      id: data.name,
      ...order,
    };
  }
);
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async () => {
    const userId = localStorage.getItem("userId");

    const response = await fetch(
      `${DATABASE_URL}/orders/${userId}.json`
    );

    const data = await response.json();

    if (!data) {
      return [];
    }

    const loadedOrders = [];

    for (const key in data) {
      loadedOrders.push({
        id: key,
        ...data[key],
      });
    }

    return loadedOrders;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
  state.orders.push(action.payload);
});
  },
});

export default orderSlice.reducer;