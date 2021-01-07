import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../views/Profile'
import Home from '../views/Home'
import GroupInfo from '../views/GroupInfo'

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
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/group/:id',
            name: 'groupInfo',
            component: GroupInfo
        }
    ]
})

export default router;