<template>
    <div>
        <loading v-if="articlesLoading"></loading>
        <div v-else>
            <div class="row">
                <div class="col-12 mb-5" v-if="!articles.data.length">Articles not found</div>
                <div class="col-12 mb-5" v-for="article in articles.data">
                    <div class="row">
                        <div class="col-3">
                            <span v-for="tag in article.tags" class="badge badge-secondary">
                                {{ tag.name}}
                            </span>
                        </div>
                        <div class="col-9" @click="$router.push({name:'articles.show', params:{'slug': article.slug}})">
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
    name: "Articles",
    components: {
        Loading
    },
    beforeMount() {
        this.getArticles();
    },
    methods: {
        getArticles(page = 1) {
            this.$store.dispatch(ARTICLES, {page, with_tags:true, per_page:5});
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
