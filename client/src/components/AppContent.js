import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import {
  login,
  logout,
  setImgSrc,
  selectLogin,
  clearImgSrc,
  setUserInfo,
  clearUserInfo,
} from '../slices/loginSlice'
import axios from 'axios'
import default_male from '../assets/images/default_male.png'
import { AppBackground, AppFallbackRender } from '.'

// routes config
import { routes_out, routes_auth } from '../routes'

const AppContent = () => {
  const ContentStyle = {
    maxWidth: `100%`,
    maxHeight: `100%`,
  }

  const dispatch = useDispatch()
  const { isLogin, isHolder } = useSelector(selectLogin)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    // check login status
    // axios
    //   .post('/api/isLogin', {})
    //   .then((res) => {
    //     console.log('isLogin res.data=', res.data)
    //     dispatch(login(res.data.isHolder))
    //     dispatch(setImgSrc(res.data.userimage === '' ? default_male : res.data.userimage))
    //     dispatch(setUserInfo(res.data))
    //   })
    //   .catch((err) => {
    //     dispatch(logout())
    //     dispatch(clearImgSrc())
    //     dispatch(clearUserInfo())
    //   })
  }, [isLogin])
  return (
    <div style={ContentStyle}>
      <AppBackground />
      <Suspense
        fallback={
          <div className="d-flex flex-row justify-content-center">
            <div className="spinner-border text-primary mt-3" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        }
      >
        <Switch>
          {routes_out.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <ErrorBoundary fallbackRender={AppFallbackRender}>
                      <route.component {...props} />
                    </ErrorBoundary>
                  )}
                />
              )
            )
          })}
          {/* {!isLogin ? <Redirect to="/home" /> : null} */}
          {isHolder
            ? routes_auth.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <>
                          <route.component {...props} />
                        </>
                      )}
                    />
                  )
                )
              })
            : null}
          {isHolder ? (
            <Redirect exact from="/" to="/auth/matching" />
          ) : (
            <Redirect exact from="/" to="/home" />
          )}
        </Switch>
      </Suspense>
    </div>
  )
}

export default React.memo(AppContent)
