import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DATABASE_URL } from "../services/firebase";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const userId = localStorage.getItem("userId");

    const response = await fetch(
      `${DATABASE_URL}/carts/${userId}.json`
    );

    const data = await response.json();

    return data || [];
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { getState }) => {
    const userId = localStorage.getItem("userId");

    const cartItems = getState().cart.items;

    let updatedCart;

    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    await fetch(`${DATABASE_URL}/carts/${userId}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCart),
    });

    return updatedCart;
  }
);


const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
  state.items = action.payload;
});
builder.addCase(addToCart.fulfilled, (state, action) => {
  state.items = action.payload;
});

},
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
