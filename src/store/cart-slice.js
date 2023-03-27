import { createSlice } from "@reduxjs/toolkit";

/* 
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newIem = action.payload;
      const existingItem = state.items.find((item) => item.id === newIem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newIem.id,
          price: newIem.price,
          quantity: 1,
          totalPrice: newIem.price,
          name: newIem.title,
        });
        // And that would be absolutely bad if you're using just Redux because push manipulates the existing array in
        // the existing state. And that's a must not do, but with Redux Toolkit, as emphasized before, we don't have
        // that problem because their Redux Toolkit internally ensures that this will not manipulate the existing state
        // but that it instead transforms this into an operation which updates the state in an immutable way. So we can
        // use push here when working with Redux Toolkit
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newIem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
*/

//************************************************ Using an Action creator Thunk

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

// Actions creators were defined her, but now moved to cart-actions.js

export const cartActions = cartSlice.actions;

export default cartSlice;
