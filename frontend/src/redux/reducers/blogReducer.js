import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = "http://localhost:9000/api/blogs";
const BASE_URL = import.meta.env.VITE_BACKEND_URL

// Create Blog
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(`${BASE_URL}/api/blogs`, payload, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "multipart/form-data",
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get All Blogs
export const getAllBlogs = createAsyncThunk(
  "blogs/getAllBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const { data } = await axios.get(`${BASE_URL}/api/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(data)
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get Single Blog
export const getSingleBlog = createAsyncThunk(
  "blogs/getSingleBlog",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/blogs/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update Blog
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(`${BASE_URL}/api/blogs/${id}`, blogData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete Blog
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(`${BASE_URL}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// like Blog for authentic user
export const likeBlog = createAsyncThunk(
  "blogs/likeBlog",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(`${BASE_URL}/api/blogs/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// Get All Blogs for public
export const allBlogs = createAsyncThunk(
  "blogs/allBlogs",
  async (_, { rejectWithValue }) => {
    try {

      const { data } = await axios.get(`${BASE_URL}/api/blogs/public`);

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    blog: null,
    loading: false,
    error: null,
    success: false,
    likesCount: 0,

  },
  reducers: {
    clearBlogState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.blog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload.blog);
        state.success = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Blogs
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Single Blog
      .addCase(getSingleBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.blog = null;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.blog = action.payload;
        // update in blogs array
        const index = state.blogs.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.blogs[index] = action.payload;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.blogs = state.blogs.filter((b) => b._id !== action.payload._id);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // all blogs for public
      .addCase(allBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
      })
      .addCase(allBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // like blog
      .addCase(likeBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        if (state.blog) {
          state.blog.likesCount = action.payload.likesCount;

          if (action.payload.liked) {
            state.blog.likes.push({ _id: action.payload.userId });
          } else {
            state.blog.likes = state.blog.likes.filter(
              (like) => like._id !== action.payload.userId
            );
          }
        }
        state.loading = false;
      })
      .addCase(likeBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearBlogState } = blogSlice.actions;
export default blogSlice.reducer;
