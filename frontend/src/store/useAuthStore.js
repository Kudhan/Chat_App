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
}));
