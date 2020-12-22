import Vue from 'vue'
import VueRouter from 'vue-router'
import Settings from '../views/Settings'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        }
    ]
})

export default router;