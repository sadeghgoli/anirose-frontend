'use client'
import { create } from "zustand";
import { removeCookie } from "../utils/helpers/cookie";
import { setAuthToken } from "../api/axios.js";

const useStore = create((set) => ({
    accessToken: null,
    user: null,
    isAuthenticated: false,

    setState: (data) => {
      if (data?.accessToken) {
        setAuthToken(data.accessToken);
      }
      set({
        accessToken: data?.accessToken || null,
        user: data?.user || null,
        isAuthenticated: !!data?.accessToken,
      });
    },

    setUser: (user) => set({ user }),

    logout: async () => {
      setAuthToken(null);
      await removeCookie("token");
      localStorage.removeItem('authToken');
      set({ accessToken: null, user: null, isAuthenticated: false });
    },

    clearAuth: () => {
      setAuthToken(null);
      set({ accessToken: null, user: null, isAuthenticated: false });
    },
}));

export default useStore;
