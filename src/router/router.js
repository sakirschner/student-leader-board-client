import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../views/Profile'
import Home from '../views/Home'
import GroupInfo from '../views/GroupInfo'
import Stats from '../views/Stats'
import Base from '../views/Base'
// import store from '../store/index'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'base',
            component: Base, 
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            // meta: {
            //     requiresAuth: false
            //   }
        },
        {
            path: '/leaderboard',
            name: 'home',
            component: Home,
            // meta: {
            //     requiresAuth: false
            //   }
        },
        {
            path: '/group/:id',
            name: 'groupInfo',
            component: GroupInfo,
            // meta: {
            //     requiresAuth: false
            //   }
        },
        {
            path: '/stats',
            name: 'stats',
            component: Stats,
            // meta: {
            //     requiresAuth: false
            //   }
        },
    ]
})

// router.beforeEach((to, from, next) => {
//     const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
//     const token = store.state.auth.token;
//     console.log(token)
//     if (requiresAuth && !token) {
//         next("/");
//       } else {
//         next();
//       }
//     });

export default router;