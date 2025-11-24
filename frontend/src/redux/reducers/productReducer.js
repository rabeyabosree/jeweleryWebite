// src/redux/reducer/webReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = "http://localhost:9000/api/products";
const BASE_URL = import.meta.env.VITE_BACKEND_URL

// Initial State
const initialState = {
  product: null,
  products: [],
  reviews: [],
  loading: false,
  error: null,
  success: false,
  message: null,
};

// ==================== Async Thunks ==================== //

// create product for admin
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/products`, productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product create failed"
      );
    }
  }
);

// get all products for admin
export const AllAdminProduct = createAsyncThunk(
  "products/allAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/all`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product fetch failed"
      );
    }
  }
);

// get single product for admin
export const adminSingleProduct = createAsyncThunk(
  "products/adminSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product fetch failed"
      );
    }
  }
);

// edit product for admin
export const AdminEditProduct = createAsyncThunk(
  "products/adminEdit",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/api/products/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product update failed"
      );
    }
  }
);

// product delete
export const deleteSingleProduct = createAsyncThunk(
  "products/deleteSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product fetch failed"
      );
    }
  }
);

// get all products for users
export const AllProduct = createAsyncThunk(
  "products/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/all`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product fetch failed"
      );
    }
  }
);

// get single product for users
export const SingleProduct = createAsyncThunk(
  "products/single",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product fetch failed"
      );
    }
  }
);

// get all products for users
export const addReview = createAsyncThunk(
  "products/review",
  async ({ id, rating, comment }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      console.log(token)
      const { data } = await axios.post(`${BASE_URL}/api/products/review/${id}`, { rating, comment }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product fetch failed"
      );
    }
  }
);

// get single product for users
export const getReviews = createAsyncThunk(
  "products/reviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/reviews/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product fetch failed"
      );
    }
  }
);


// ==================== Slice ==================== //

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------- createProduct --------
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload.product;
        state.message = action.payload.message;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // -------- AllAdminProduct --------
      .addCase(AllAdminProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(AllAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(AllAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- AdminSingleProduct --------
      .addCase(adminSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(adminSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- AdminEditProduct --------
      .addCase(AdminEditProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(AdminEditProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload.product;
        state.message = action.payload.message;
      })
      .addCase(AdminEditProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // -------- AdminDeleteProduct --------
      .addCase(deleteSingleProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(deleteSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // -------- AllProduct (for users) --------
      .addCase(AllProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(AllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(AllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- SingleProduct (for users) --------
      .addCase(SingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(SingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(SingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- AllProduct (for users) --------
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- SingleProduct (for users) --------
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = productSlice.actions;
export default productSlice.reducer;
