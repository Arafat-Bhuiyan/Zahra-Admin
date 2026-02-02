import { createSlice } from "@reduxjs/toolkit";

// Read persisted role from localStorage (safe for SSR)
const persistedRole =
  typeof window !== "undefined" ? localStorage.getItem("role") : null;
const initialState = {
  role: persistedRole ? persistedRole : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("role", action.payload);
      }
    },
    clearRole(state) {
      state.role = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("role");
      }
    },
  },
});

export const { setRole, clearRole } = authSlice.actions;
export default authSlice.reducer;
