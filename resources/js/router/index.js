import Vue from 'vue';
import Router from 'vue-router';
import Home from "../pages/Home";
import Articles from "../pages/Articles";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name:'home',
            component: Home
        },
        {
            path: '/articles',
            name:'articles',
            component: Articles
        },
    ]
});

export default router
