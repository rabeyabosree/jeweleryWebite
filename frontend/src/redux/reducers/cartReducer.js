import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const item = action.payload; // { _id, title, image, price, stock, qty }
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // ✅ If product already in cart, update its quantity (not just +1)
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id
            ? { ...x, qty: Math.min(item.qty, x.stock) } // use provided qty
            : x
        );
      } else {
        // ✅ New item
        state.cartItems.push({ ...item, qty: Math.min(item.qty || 1, item.stock) });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // updateQty: (state, action) => {
    //   const { id, qty } = action.payload;
    //   state.cartItems = state.cartItems.map((x) =>
    //     x._id === id ? { ...x, qty } : x
    //   );
    //   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    // },
    updateQty: (state, action) => {
      const { id, qty } = action.payload;

      state.cartItems = state.cartItems.map((x) => {
        if (x._id === id) {
          // Calculate the difference in quantity
          const diff = qty - x.qty;

          // Update qty
          const updatedItem = { ...x, qty };

          // Update stock (reduce by diff)
          updatedItem.stock = Math.max(x.stock - diff, 0);

          return updatedItem;
        }
        return x;
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },


    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
