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

  },
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
