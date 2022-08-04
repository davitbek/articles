import Vue from 'vue'
import Vuex from 'vuex'

import articles from './articles/reducers'
import tags from './tags/reducers'
import comments from './comments/reducers'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        articles,
        tags,
        comments,
    }
})
