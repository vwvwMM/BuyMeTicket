/* eslint-disable prettier/prettier */
import { useEffect } from 'react'
import AOS from 'aos'
import React from 'react'
import { happyBg } from '.'
const Home = () => {
  useEffect(() => {
    AOS.init({
      once: false,
      disable: 'phone',
      duration: 1000,
      easing: 'ease-out-cubic',
    })
    window.addEventListener('load', AOS.refresh)
  }, [])
  return (
    <div className="">
      <img
        src={happyBg}
        className="card-img position-absolute"
        style={{ opacity: 0.3, height: '100%', width: '100%' }}
      />
      <div className="card-img-overlay d-flex justify-content-center align-items-center flex-column">
        <h1 className=" display-2 d-flex justify-content-center text-center text-white mb-3">
          <b>
            SAY NO TO SCALPERS !<br />
            EMPOWERING
            <br />
            TRUE FANS,
          </b>
        </h1>
        <a
          href="/activities"
          className="text-dark display-3 bg-white px-5 py-4 rounded-pill text-center mt-3"
        >
          EXPLORE APP
        </a>
      </div>
    </div>
  )
}

export default Home
