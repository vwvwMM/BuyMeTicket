import { NavHashLink } from 'react-router-hash-link'

const _nav = [
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'HOME',
    to: '/home',
  },
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'ACTIVITIES',
    to: '/activities',
  },
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'POOL',
    to: '/pool',
  },
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'LEADERBOARD',
    to: '/leaderboard',
  },
  {
    _component: 'CNavItem',
    as: NavHashLink,
    anchor: 'CONTACT US',
    to: '/contact',
  },
]

export default _nav
