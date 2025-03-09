import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast'; // Make sure to import toast

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isCheckingAuth: true,

  // Check if the user is authenticated
  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        set({ authUser: null, isCheckingAuth: false });
        return;
      }

      const res = await axiosInstance.get("/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ authUser: res.data, isCheckingAuth: false });
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  // Signup method
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      console.log("Sending data to the server: ", data);
      const res = await axiosInstance.post("/auth/signup", data);
      console.log("Signup successful: ", res);
      set({ authUser: res.data });
      toast.success("Account created successfully");

      // Get the current state using getState
      const state = get();  // Access the state here if needed
      console.log("Current state: ", state);

      // If you have a function like connectSocket(), call it here
      // state.connectSocket();
    } catch (error) {
      console.error("Error during signup:", error);  // Add more logging to check for error details
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      // Log the error object for debugging purposes
      console.error("Error during logout:", error);
  
      // Check if error.response is defined and if it contains a message
      const errorMessage = error?.response?.data?.message || "An error occurred during logout";
      toast.error(errorMessage);
    }
  }
  
}));
