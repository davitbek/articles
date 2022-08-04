<template>
    <div>
        <loading v-if="articlesLoading"></loading>
        <div v-else>
            <div class="col-12 mb-5" v-if="!articles.data.length">Articles not found</div>
            <div class="row">
                <div class="col-4" v-for="article in articles.data" @click="$router.push({name:'articles.show', params:{'slug': article.slug}})">
                    <img :src="article.image_path" alt="" style="width: inherit !important;">
                    <h1>{{article.name}}</h1>
                    <div>{{ article.text}}</div>
                    <div class="row">
                        <div class="col-6">
                            <views :article="article"></views>
                        </div>
                        <div class="col-6 text-right">
                            <like :article="article"></like>
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
import {mapGetters} from 'vuex';
import Loading from "../components/partials/Loading";
import Like from "../components/partials/Like";
import Views from "../components/partials/Views";
export default {

    name: "Home",
    components: {
        Loading,
        Like,
        Views,
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
