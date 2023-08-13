//routes/api.js 控管後端所有頁面部屬
const express = require('express')
const router = express.Router()
const env = require('dotenv')
env.config()

if (process.env.NODE_ENV === 'development') {
  //test
  console.log('running in dev mode')
}

//out
//login, register
router.use(require('./srcs/out/account/main'))
//forget, activation
router.use(require('./srcs/out/forget/main'))

//in
//check is user
router.use(require('./srcs/in/auth/isUser'))
//dashboard
router.use(require('./srcs/in/dashboard/main'))
//profile, searchProfile
router.use(require('./srcs/in/profile_new/main'))
//showPerson, chLogin, isLogin, logout
router.use(require('./srcs/in/account/main').router)
//check is auth
router.use(require('./srcs/in/auth/isAuth'))
//activity
router.use(require('./srcs/in/activity/main').router)

//auth
// router.use(require('./srcs/in/auth/main'))
//account
router.use(require('./srcs/in/account/main').router_auth)

//error handling, every error thrown by previous router will be catch by me
router.use(require('./error').handleError)

module.exports = router
