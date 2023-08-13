import React from 'react'
import { AppContent, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1 flex-column">
          <AppContent />
        </div>
      </div>
      {/* <div className="wrapper d-flex flex-column">
        <AppFooter />
      </div> */}
    </div>
  )
}

export default DefaultLayout
