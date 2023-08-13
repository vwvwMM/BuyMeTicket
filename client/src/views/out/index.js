import React from 'react'

const Home = React.lazy(() => import('./home'))
const Activities = React.lazy(() => import('./activities'))
const Pool = React.lazy(() => import('./pool'))
const Leaderboard = React.lazy(() => import('./leaderboard'))
const Contact = React.lazy(() => import('./contact'))
const Activity = React.lazy(() => import('./activity'))

export { Home, Activities, Pool, Leaderboard, Contact, Activity }
