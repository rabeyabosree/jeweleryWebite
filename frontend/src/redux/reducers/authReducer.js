// src/redux/reducer/webReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:9000/api/auth";

// -------------------- Initial State --------------------
const initialState = {
    user: null,
    profile: null,
    token: null,
    loading: false,
    error: null,
    success: false,
    message: null,
};

// -------------------- Thunks --------------------

// Register
export const authRegister = createAsyncThunk(
    "auth/register",
    async (authData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/register`, authData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

// Login
export const authLogin = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/login`, credentials);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

// Upload Profile Image
export const upProfile = createAsyncThunk(
    "auth/profile-upload",
    async (profileData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/profile`, profileData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Profile upload failed");
        }
    }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
    "auth/forgot-password",
    async (emailData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/forgot-password`, emailData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Forgot password failed");
        }
    }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
    "auth/verify-otp",
    async (otpData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/verify-otp`, otpData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "OTP verification failed");
        }
    }
);

// Reset Password
export const resetPassword = createAsyncThunk(
    "auth/reset-password",
    async (resetData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/reset-password`, resetData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Reset password failed");
        }
    }
);

// -------------------- Slice --------------------
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
           
        },
        loadUser: (state) => {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            if (token && user) {
                state.token = token;
                state.user = JSON.parse(user);
            }
        },
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(authRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(authRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.message = action.payload.message;
                state.success = true;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(authRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Login
        builder
            .addCase(authLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.success = true;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Profile Upload
        builder
            .addCase(upProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(upProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload.profile;
                state.user.profile = action.payload.profile;
                
            })
            .addCase(upProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Forgot Password
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Verify OTP
        builder
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Reset Password
        builder
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
