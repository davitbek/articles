<template>
    <div>
        <loading v-if="articleLoading"></loading>
        <div v-else>
            <div v-if="article">
                <h1 class="mb-5">{{article.name}}</h1>
                <div class="mb-5">
                    <like :article="article"></like>
                    <views :article="article"></views>
                </div>
                <div class="mb-5">
                    <tags :article="article"></tags>
                </div>
                <div>{{ article.text}}</div>
            </div>
            <div v-else>
                Article not found
            </div>
        </div>
    </div>
</template>

<script>
import {ARTICLE} from "../store/articles/actions";
import {mapGetters} from 'vuex';
import Loading from "../components/partials/Loading";
import Like from "../components/partials/Like";
import Views from "../components/partials/Views";
import Tags from "../components/partials/Tags";

export default {
    name: "Articles",
    components: {
        Loading,
        Like,
        Views,
        Tags,
    },
    beforeMount() {
        this.$store.dispatch(ARTICLE, {slug: this.$route.params.slug});
    },
    methods: {
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
