<template>
    <div>
        <loading v-if="articlesLoading"></loading>
        <div v-else>
            <div class="row">
                <div class="col-4" v-for="article in articles.data" @click="$router.push({name:'articles.show', params:{'slug': article.slug}})">
                    <img :src="article.image_path" alt="" style="width: inherit !important;">
                    <h1>{{article.name}}</h1>
                    <div>{{ article.text}}</div>
                    <div class="row">
                        <div class="col-6">
                            <i class="glyphicon glyphicon-eye-open"></i>
                            <span>{{ article.views_count }}</span>
                        </div>
                        <div class="col-6 text-right">
                            <span class="glyphicon glyphicon-heart"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Pagination :data="articles" @pagination-change-page="getArticles" />
    </div>
</template>

<script>
import {ARTICLES} from "../store/articles/actions";
import {mapGetters, mapState} from 'vuex';
import Loading from "../components/partials/Loading";

export default {
    name: "Home",
    components: {
        Loading
    },
    beforeMount() {
        this.getArticles();
    },
    methods: {
       getArticles(page = 1) {
           this.$store.dispatch(ARTICLES, {page});
       }
    },
    computed: {
        ...mapGetters([
            'articles',
            'articlesLoading',
        ]),
    }
}
</script>

<style scoped>

</style>
