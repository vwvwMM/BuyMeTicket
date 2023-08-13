import React from 'react'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { selectLogin, login } from '../slices/loginSlice'
import { selectSearch, setKeywords, setResultProfiles } from '../slices/searchSlice'
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CNavLink, CButton } from '@coreui/react'

import { AppHeaderDropdown } from './header'

import logo_row from '../assets/images/logo_row.png'
import axios from 'axios'
import nav from '../_nav'

const AppHeader = () => {
  const dispatch = useDispatch()
  const { isLogin, isHolder } = useSelector(selectLogin)

  return (
    <CHeader position="sticky">
      <CContainer fluid className="d-flex flex-nowrap">
        <CHeaderBrand className="d-none d-md-flex me-auto" to="/">
          <img src={logo_row} alt="logo" width="200rem" className="d-block" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto justify-content-around">
          {nav.map((item, index) => {
            return (
              <CNavLink
                key={index}
                to={item.to}
                component={NavLink}
                activeClassName="nav-active"
                exact={item.exact}
                className="mx-2"
              >
                {item.anchor}
              </CNavLink>
            )
          })}
        </CHeaderNav>
        {isLogin ? (
          <CHeaderNav className="ms-3 d-none d-md-block">
            <CButton>{isHolder ? 'EVENT HOLDER' : 'USER WALLET'}</CButton>
          </CHeaderNav>
        ) : (
          <CHeaderNav className="d-none d-md-block">
            <CButton onClick={() => dispatch(login(true))}>CONNECT WALLET</CButton>
          </CHeaderNav>
        )}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
