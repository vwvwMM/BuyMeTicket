import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, clearImgSrc, clearUserInfo, selectLogin } from '../../slices/loginSlice'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const { imgSrc, name } = useSelector(selectLogin)
  const handleLogOut = (e) => {
    e.preventDefault()
    axios
      .post('/api/logout', {})
      .then((res) => {
        alert('登出成功!')
        dispatch(logout())
        dispatch(clearImgSrc())
        dispatch(clearUserInfo())
        window.location.href = '/home'
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        placement="bottom-end"
        className="py-0 d-flex align-items-center"
        caret={false}
      >
        <CAvatar size="md" className="mx-1" src={imgSrc} />
        <h5 className="mb-0">{name}</h5>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownHeader className="bg-light fw-semibold py-2"></CDropdownHeader> */}
        <CDropdownItem className="fs-5" component={Link} to={`/my_profiles`}>
          <CIcon icon="cil-user" name="cil-user" className="me-2" />
          我的名片
        </CDropdownItem>
        <CDropdownItem className="fs-5" component={Link} to={`/activities/myself`}>
          <CIcon icon="cil-user" name="cil-user" className="me-2" />
          我的活動
        </CDropdownItem>

        <CDropdownItem className="fs-5" component={Link} to={`/change_password`}>
          <CIcon icon="cil-lock-locked" name="cil-lock-locked" className="me-2" />
          變更密碼
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem className="fs-5" onClick={handleLogOut}>
          <CIcon icon="cil-lock-locked" name="cil-lock-locked" className="me-2" />
          登出
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
