import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../views/Profile'
import Home from '../views/Home'
import GroupInfo from '../views/GroupInfo'
import Stats from '../views/Stats'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/leaderboard',
            name: 'home',
            component: Home
        },
        {
            path: '/group/:id',
            name: 'groupInfo',
            component: GroupInfo
        },
        {
            path: '/stats',
            name: 'stats',
            component: Stats
        },
    ]
})

export default router;