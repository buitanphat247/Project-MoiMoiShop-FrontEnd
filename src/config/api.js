import axios from "axios";
import { logoutUser, userLogoutFetch } from "../slices/authSlice";
import store from "../store/store";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.REACT_APP_HOST_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  // .. other options
});

// Request interceptor để thêm accessToken vào header
api.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi 401 và làm mới accessToken
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response, config } = error;

    if (response && response.status === 401 && !config._retry) {
      try {
        config._retry = true;
        const response = await api.get(`/auths/refresh`);
        const newAccessToken = response.data.data.access_token;
        localStorage.setItem("access_token", newAccessToken);
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // Thực hiện lại yêu cầu gốc với token mới
        return api(config);
      } catch (_error) {
        console.log('_error: ', _error);
        if (_error.response && _error.response.status === 400) {
          store.dispatch(
            logoutUser({ user: {}, isAuthenticated: false, error: null })
          );
          localStorage.removeItem("access_token");
          toast.info("Vui lòng đăng nhập lại!");
          window.location.href = "/"; // Hoặc URL bạn muốn chuyển hướng đến
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
