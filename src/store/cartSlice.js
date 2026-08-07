import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DATABASE_URL } from "../services/firebase";

const saveCart = async (userId, cart) => {
    await fetch(`${DATABASE_URL}/carts/${userId}.json`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
    });
};

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
            if (existingItem.quantity >= existingItem.stock) {
                alert(`Only ${existingItem.stock} items available`);
                return cartItems;
            }

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
                    stock: Number(product.quantity),
                    quantity: 1,
                },
            ];
        }
        await saveCart(userId, updatedCart);

        return updatedCart;
    }
);
export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async () => {
        const userId = localStorage.getItem("userId");

        await fetch(
            `${DATABASE_URL}/carts/${userId}.json`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([]),
            }
        );

        return [];
    }
);
export const increaseQuantity = createAsyncThunk(
    "cart/increaseQuantity",
    async (id, { getState }) => {
        const userId = localStorage.getItem("userId");

        const cartItems = getState().cart.items;

        const updatedCart = cartItems.map((item) => {
            if (item.id === id) {
                if (item.quantity >= item.stock) {
                    alert(`Only ${item.stock} items available`);
                    return item;
                }

                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }

            return item;
        });

        await saveCart(userId, updatedCart);

        return updatedCart;
    }
);
export const decreaseQuantity = createAsyncThunk(
    "cart/decreaseQuantity",
    async (id, { getState }) => {
        const userId = localStorage.getItem("userId");

        const cartItems = getState().cart.items;

        let updatedCart = [];

        const item = cartItems.find((item) => item.id === id);

        if (!item) return cartItems;

        if (item.quantity === 1) {
            updatedCart = cartItems.filter((item) => item.id !== id);
        } else {
            updatedCart = cartItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        }

        await saveCart(userId, updatedCart);

        return updatedCart;
    }
);
export const removeItem = createAsyncThunk(
    "cart/removeItem",
    async (id, { getState }) => {
        const userId = localStorage.getItem("userId");

        const cartItems = getState().cart.items;

        const updatedCart = cartItems.filter(
            (item) => item.id !== id
        );

        await saveCart(userId, updatedCart);

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
        builder.addCase(increaseQuantity.fulfilled, (state, action) => {
            state.items = action.payload;
        });
        builder.addCase(decreaseQuantity.fulfilled, (state, action) => {
            state.items = action.payload;
        });

        builder.addCase(removeItem.fulfilled, (state, action) => {
            state.items = action.payload;
        });
        builder.addCase(clearCart.fulfilled, (state, action) => {
            state.items = action.payload;
        });

    },
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
