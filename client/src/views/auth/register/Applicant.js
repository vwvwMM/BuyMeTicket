/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
const Applicant = ({ person, setIsModal, setModalPerson }) => {
  const show = () => {
    setModalPerson(person)
    setIsModal(true)
  }
  return (
    <div className="d-flex align-items-center m-4 justify-content-around p-2 applicant">
      <div className="col-2">
        姓名：
        <br />
        {person.username}
      </div>
      <div className="col-3">
        <img src={person.imgSrc} alt="" style={{ height: '10rem' }} />
      </div>
      <div className="col-6">
        <nobr>line ID：{person.account}</nobr>
        <br />
        <nobr>信箱：{person.email}</nobr>
        <br />
        <nobr>手機：{person.cellphone}</nobr>
      </div>
      <div className="col-1">
        <CButton color="primary" onClick={() => show()}>
          <CIcon icon="cil-search" name="cil-search" />
        </CButton>
      </div>
    </div>
  )
}
Applicant.propTypes = {
  person: PropTypes.object,
  setIsModal: PropTypes.func,
  setModalPerson: PropTypes.func,
}
export default Applicant
