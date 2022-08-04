<template>
    <div>
        <div v-if="article">
            <h1 class="mb-5">{{article.name}}</h1>
            <div class="mb-5">
                <span class="glyphicon glyphicon-heart"></span>
                <i class="glyphicon glyphicon-eye-open"></i>
                <span>{{ article.views_count }}</span>
            </div>
            <div class="mb-5">
                <span v-for="tag in article.tags" class="badge badge-secondary">
                    {{ tag.name}}
                </span>
            </div>
            <div>{{ article.text}}</div>
        </div>
        <div v-else>
            Article not found
        </div>
    </div>
</template>

<script>
import {ARTICLE} from "../store/articles/actions";
import {mapGetters, mapState} from 'vuex';
import Loading from "../components/partials/Loading";

export default {
    name: "Articles",
    components: {
        Loading
    },
    beforeMount() {
        this.$store.dispatch(ARTICLE, {slug: this.$route.params.slug});
    },
    methods: {
        getArticles(page = 1) {
        }
    },
    computed: {
        ...mapGetters([
            'article',
            'articleLoading',
        ]),
    }
}
</script>

<style scoped>

</style>
