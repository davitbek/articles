require('./bootstrap');
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import LaravelVuePagination from 'laravel-vue-pagination';

window.Vue = require('vue').default;
Vue.component('Pagination', LaravelVuePagination);

import Vue from 'vue';
import Main from './Main';
import router from './router/index';
import store from './store/index';
import ApiService from './services/api';

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
ApiService.init();

const app = new Vue({
    el: '#app',
    store,
    router,
    template: '<Main/>',
    components: { Main },
});
