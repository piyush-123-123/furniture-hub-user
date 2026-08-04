import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
addItem(state, action) {


  const newItem = action.payload;

  const existingItem = state.items.find(
    (item) => item.id === newItem.id
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    state.items.push({
      ...newItem,
      quantity: 1,
    });
  }

},
increaseQuantity(state, action) {
  const id = action.payload;

  const item = state.items.find(
    (item) => item.id === id
  );

  if (item) {
    item.quantity++;
  }
},

decreaseQuantity(state, action) {
  const id = action.payload;

  const item = state.items.find(
    (item) => item.id === id
  );

  if (!item) return;

  if (item.quantity === 1) {
    state.items = state.items.filter(
      (item) => item.id !== id
    );
  } else {
    item.quantity--;
  }
},

removeItem(state, action) {
  const id = action.payload;

  state.items = state.items.filter(
    (item) => item.id !== id
  );
},

  },
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
