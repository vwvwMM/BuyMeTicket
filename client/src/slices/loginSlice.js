import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    isHolder: false,
    imgSrc: null,
    lineID: '',
    email: '',
    cellphone: '',
    name: '',
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true
      state.isHolder = action.payload
    },
    logout: (state) => {
      state.isLogin = false
      state.isHolder = false
    },
    setImgSrc: (state, action) => {
      state.imgSrc = action.payload
    },
    clearImgSrc: (state) => {
      state.imgSrc = null
    },
    setUserInfo: (state, action) => {
      state.lineID = action.payload.account
      state.cellphone = action.payload.userCellphone
      state.name = action.payload.userName
      state.email = action.payload.userEmail
    },
    clearUserInfo: (state, action) => {
      state.lineID = ''
      state.cellphone = ''
      state.name = ''
      state.email = ''
    },
  },
})

export const { login, logout, setImgSrc, clearImgSrc, setUserInfo, clearUserInfo } =
  loginSlice.actions
export const selectLogin = (state) => state.login
export default loginSlice.reducer
