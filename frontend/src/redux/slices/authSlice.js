import { createSlice } from '@reduxjs/toolkit';
import { REFRESH_KEY, TOKEN_KEY, USER_KEY } from '../../constants/roles';

const persistedUser = (() => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const initialState = {
  user: persistedUser,
  accessToken: localStorage.getItem(TOKEN_KEY) || null,
  refreshToken: localStorage.getItem(REFRESH_KEY) || null,
  status: persistedUser ? 'authenticated' : 'anonymous',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = token;
      state.refreshToken = refreshToken;
      state.status = 'authenticated';
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(REFRESH_KEY, refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem('agrismart_role', user.role);
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem(USER_KEY, JSON.stringify(state.user));
      if (action.payload.role) {
        localStorage.setItem('agrismart_role', action.payload.role);
      }
    },
    setRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload;
        localStorage.setItem('agrismart_role', action.payload);
        localStorage.setItem(USER_KEY, JSON.stringify(state.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = 'anonymous';
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
    },
  },
});

export const { setCredentials, updateUser, setRole, logout } = authSlice.actions;
export default authSlice.reducer;
