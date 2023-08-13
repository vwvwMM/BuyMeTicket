import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    sidebarShow: false,
  },
  reducers: {
    sidebarHide: (state) => {
      state.sidebarShow = false
    },
    sidebarOpen: (state) => {
      state.sidebarShow = true
    },
  },
})

export const { sidebarHide, sidebarOpen, squeezeSidebar, stretchSidebar } = globalSlice.actions
export const selectGlobal = (state) => state.global
export default globalSlice.reducer
