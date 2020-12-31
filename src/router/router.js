import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../views/Profile'
import Home from '../views/Home'

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
        }

    ]
})

export default router;