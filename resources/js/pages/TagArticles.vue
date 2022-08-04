<template>
    <div>
        <loading v-if="articlesLoading"></loading>
        <div v-else>
            <div class="row">
                <div class="col-12 mb-5" v-if="!articles.data.length">Articles not found</div>
                <div class="col-12 mb-5" v-for="article in articles.data">
                    <div class="row">
                        <div class="col-3">
                            <tags :article='article'></tags>
                        </div>
                        <div class="col-9" @click="$router.push({name:'articles.show', params:{'slug': article.slug}})">
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
import Tags from "../components/partials/Tags";

export default {
    name: "TagArticles",
    components: {
        Loading,
        Like,
        Views,
        Tags,
    },
    beforeMount() {
        this.getArticles();
    },
    methods: {
        getArticles(page = 1) {
            this.$store.dispatch(ARTICLES, {page, with_tags:true, per_page:5, tag:this.$route.params.slug});
        }
    },
    computed: {
        ...mapGetters([
            'articles',
            'articlesLoading',
        ]),
    },
    watch: {
        '$route.params.slug' (){
            this.getArticles();
        }
    }
}
</script>

<style scoped>

</style>
