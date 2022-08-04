require('./bootstrap');

window.Vue = require('vue').default;

import Vue from 'vue';
import Main from './Main';
import router from './router/index';
import store from './store/index';
import ApiService from './services/api';

ApiService.init();

const app = new Vue({
    el: '#app',
    store,
    router,
    template: '<Main/>',
    components: { Main },
});
