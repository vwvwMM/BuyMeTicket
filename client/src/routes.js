// out pages
import { Activities, Contact, Home, Leaderboard, Pool, Activity } from './views/out'
// auth pages

import { AuthRegister } from './views/auth'

// out routes
const routes_out = [
  { path: '/home', exact: false, name: 'Home', component: Home },
  { path: '/activities', exact: false, name: 'Activities', component: Activities },
  { path: '/pool', exact: false, name: 'Pool', component: Pool },
  { path: '/leaderboard', exact: false, name: 'Leaderboard', component: Leaderboard },
  { path: '/contact', exact: false, name: 'Contact', component: Contact },
  { path: '/activity/:id', exact: false, name: 'Activity', component: Activity },
]

const routes_auth = [
  {
    path: '/auth/register',
    exact: true,
    name: 'AuthRegister',
    component: AuthRegister,
  },
]
export { routes_out, routes_auth }
