// orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:9000/api/orders"

// Create order
export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.post(`${BASE_URL}`, orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Get single order
export const getOrder = createAsyncThunk(
    "order/getOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(`${BASE_URL}/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Pay order (update paymentResult)
export const payOrder = createAsyncThunk(
    "order/payOrder",
    async ({ orderId, paymentResult }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.put(`${BASE_URL}/payment/success/${orderId}`, {
                paymentResult
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


// Get all orders of current user
export const getUserOrders = createAsyncThunk(
    "order/getUserOrders",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(`${BASE_URL}/myorders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data; // array of orders
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


// Get all orders for admin
export const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(`${BASE_URL}/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data; // array of all orders
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Get all orders for admin
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `${BASE_URL}/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data; // ✅ updated order object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: null,
        loading: false,
        error: null,
        success: false,
        orderId: null,
        orders: [],          // user orders
        allOrders: [],       // admin orders
    },
    reducers: {
        resetOrderState: (state) => {
            state.order = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // createOrder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
                state.success = true;
                state.orderId = action.payload.orderId;
                localStorage.setItem("orderId", action.payload.orderId)
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // getOrder
            .addCase(getOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                // Update existing order state with new data
                state.order = {
                    ...state.order,
                    ...action.payload
                };
                state.orderId = action.payload.orderId || state.orderId;
                localStorage.setItem("orderId", action.payload.orderId)
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // payOrder
            .addCase(payOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(payOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = {
                    ...state.order,
                    ...action.payload.order
                };
                state.success = true;
            })
            .addCase(payOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- getUserOrders ---
            .addCase(getUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- getAllOrders (admin) ---
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.allOrders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
