import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    globalSearch: '',
    sidebarOpen: false,
    notificationsOpen: false,
  },
  reducers: {
    setGlobalSearch: (state, action) => {
      state.globalSearch = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setNotificationsOpen: (state, action) => {
      state.notificationsOpen = action.payload;
    },
  },
});

export const { setGlobalSearch, toggleSidebar, setNotificationsOpen } = uiSlice.actions;
export default uiSlice.reducer;
