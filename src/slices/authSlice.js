import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: {},
  isAuthenticated: false, // Giả sử ban đầu người dùng chưa được xác thực
  isInitialized: false,
  error: null,
};

export const userLoginFetch = createAsyncThunk(
  "auth/userPostFetch",
  async (userInfo, thunkAPI) => {
    try {
      const url = `${process.env.REACT_APP_HOST_BACKEND}/auths/login`;
      const response = await axios.post(url, userInfo, {
        withCredentials: true,
      });
      const data = response.data.data.meta;
      const access_token = response.data.data.access_token;
      localStorage.setItem("access_token", access_token);
      thunkAPI.dispatch(
        loginUser({
          user: data,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getProfileFetch = createAsyncThunk(
  "auth/getProfileFetch",
  async (_, thunkAPI) => {
    const url = `${process.env.REACT_APP_HOST_BACKEND}/auths/login`;
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      try {
        const url = `${process.env.REACT_APP_HOST_BACKEND}/auths/account`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          withCredentials: true,
        });
        const data = response.data.data;
        thunkAPI.dispatch(
          loginUser({
            user: data,
            isAuthenticated: true,
            error: null,
          })
        );
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    } else {
      thunkAPI.dispatch(
        loginUser({
          user: {},
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      );
    }
  }
);

export const userLogoutFetch = createAsyncThunk(
  "auth/userLogoutFetch",
  async (_, thunkAPI) => {
    const url = `${process.env.REACT_APP_HOST_BACKEND}/auths/logout`;
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          withCredentials: true,
        }
      );
      const data = response.data.data;
      thunkAPI.dispatch(
        loginUser({
          user: {},
          isAuthenticated: false,
          error: null,
        })
      );
      localStorage.setItem("access_token", "");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logoutUser: (state, action) => {
      state.currentUser = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.error = action.payload.error;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
