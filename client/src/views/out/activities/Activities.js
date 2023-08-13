import React from 'react'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'
import { selectLogin } from '../../../slices/loginSlice'
import {
  CRow,
  CCol,
  CImage,
  CCarousel,
  CCarouselItem,
  CCarouselCaption,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'
import { Link } from 'react-router-dom'
const Activities = () => {
  const { isLogin, isHolder } = useSelector(selectLogin)

  const activities = [
    {
      title: 'activity1',
      description: 'description1',
      image: 'https://picsum.photos/2800/300',
      date: '2023-10-10',
      watches: 100,
      totalTickets: 1000,
      leftTickets: 100,
      startSellTime: '2023-10-01',
      endSellTime: '2023-10-09',
      id: 1,
    },
    {
      title: 'activity2',
      description: 'description2',
      image: 'https://picsum.photos/2000/300',
      date: '2023-11-10',
      watches: 170,
      totalTickets: 800,
      leftTickets: 300,
      startSellTime: '2023-08-01',
      endSellTime: '2023-08-19',
      id: 2,
    },
    {
      title: 'activity3',
      description: 'description3',
      image: 'https://picsum.photos/2000/310',
      date: '2023-11-20',
      watches: 570,
      totalTickets: 1800,
      leftTickets: 200,
      startSellTime: '2023-11-01',
      endSellTime: '2023-11-19',
      id: 3,
    },
    {
      title: 'activity4',
      description: 'description4',
      image: 'https://picsum.photos/2100/300',
      date: '2023-11-30',
      watches: 270,
      totalTickets: 1100,
      leftTickets: 600,
      startSellTime: '2023-11-01',
      endSellTime: '2023-11-29',
      id: 4,
    },
    {
      title: 'activity5',
      description: 'description5',
      image: 'https://picsum.photos/3000/300',
      date: '2023-11-30',
      watches: 210,
      totalTickets: 2100,
      leftTickets: 1600,
      startSellTime: '2023-11-01',
      endSellTime: '2023-11-29',
      id: 5,
    },
  ]

  const popularActivities = activities.sort((a, b) => b.watches - a.watches).slice(0, 3)
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5">
      <h1>掌握未來 - NFT 票券專屬於你的獨特體驗</h1>
      <br />
      <CRow className="justify-content-center my-4">
        <CCard className="bg-transparent border-0">
          <CCardHeader className="section-title mb-1 border-0 text-center bg-transparent">
            <h1>近期熱門活動</h1>
          </CCardHeader>
          <CCardBody>
            <CCarousel controls indicators transition="crossfade">
              {popularActivities.map((popAct, index) => {
                return (
                  <CCarouselItem key={index}>
                    <Link to={`/activity/${popAct.id}`}>
                      <CImage
                        className="d-block w-auto"
                        height="400"
                        fluid
                        src={popAct.image}
                        alt={popAct.id}
                      />
                      <CCarouselCaption className="d-none d-md-block w-100">
                        <h3>{popAct.title}</h3>
                      </CCarouselCaption>
                    </Link>
                  </CCarouselItem>
                )
              })}
            </CCarousel>
          </CCardBody>
        </CCard>
      </CRow>
      <br />
      <div className="row w-100">
        {isHolder && (
          <a href="/add_activity" className="col-4 mb-3">
            <div className="card shadow-sm">
              <img
                src="https://th.bing.com/th/id/OIP.kXjGyUHGaXmmMvl_DW8g3gHaHa?w=185&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                className="card-img"
                height="450"
              />
            </div>
          </a>
        )}
        {activities.map((activity, index) => {
          activity.startSelling =
            new Date(activity.startSellTime) <= new Date() &&
            new Date() <= new Date(activity.endSellTime)
          return (
            <div className="col-4 mb-3" key={activity.id}>
              <div className="card shadow-sm">
                <img src={activity.image} className="card-img" height="350" />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h2>{activity.title}</h2>
                    <p>
                      瀏覽人次:{activity.watches}
                      <br />
                      剩餘/總票數:{activity.leftTickets}/{activity.totalTickets}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-body-secondary m-0">
                      {' '}
                      <CIcon icon="cil-calendar" /> {activity.date}
                    </p>
                    <a
                      href={`/activity/${activity.id}`}
                      className={`btn btn-${activity.startSelling ? 'success' : 'primary'}`}
                    >
                      {activity.startSelling ? '開賣中' : '檢視活動'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Activities
