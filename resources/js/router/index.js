import Vue from 'vue';
import Router from 'vue-router';
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import TagArticles from "../pages/TagArticles";
import ArticleShow from "../pages/ArticleShow";

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
        {
            path: '/articles/tags/:slug',
            name:'articles.tag',
            component: TagArticles
        },
        {
            path: '/articles/:slug',
            name:'articles.show',
            component: ArticleShow
        },
    ]
});

export default router
