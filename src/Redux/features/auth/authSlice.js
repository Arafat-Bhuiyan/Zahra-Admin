import { createSlice } from "@reduxjs/toolkit";

// Read persisted auth from localStorage (safe for SSR)
const persistedAuth =
  typeof window !== "undefined" ? localStorage.getItem("auth") : null;
let initialState = {
  role: null,
  accessToken: null,
  refreshToken: null,
};

if (persistedAuth) {
  try {
    const authData = JSON.parse(persistedAuth);
    initialState = {
      role: authData.role || null,
      accessToken: authData.access || null,
      refreshToken: authData.refresh || null,
    };
  } catch (error) {
    console.warn("Failed to parse auth data from localStorage:", error);
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth");
    }
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      const { access, refresh, role } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.role = role;
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify({ access, refresh, role }));
      }
    },
    clearAuth(state) {
      state.role = null;
      state.accessToken = null;
      state.refreshToken = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
