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
                <hr>
                <div class="mb-3">
                    <input type="email" :class="['form-control', errors.theme ? 'is-invalid' : '']" v-model="theme" placeholder="theme">
                    <div v-if="errors.theme" class="invalid-feedback">
                        Please fill theme.
                    </div>
                </div>
                <div class="mb-3">
                    <textarea  :class="['form-control', errors.comment ? 'is-invalid' : '']" v-model="comment" rows="3" placeholder="type your comment"></textarea>
                    <div v-if="errors.comment" class="invalid-feedback">
                        Please fill comment.
                    </div>
                </div>
                <button class="btn btn-primary" @click="storeComment">Send</button>
                <loading v-if="articleCommentsLoading"></loading>
                <div v-else-if="!articleComments.data.length">

                </div>
                <div v-else  class="row">
                    <div class="col-12" v-for="comment in articleComments.data">
                        <h2>{{ comment.theme }}</h2>
                        <p>{{ comment.comment }}</p>
                    </div>
                    <i>
                        TODO in next developmenmt add load more options for keep existing comments and load remians comments
                    </i>
                </div>
                <Pagination :data="articleComments" @pagination-change-page="getArticleComments" />
            </div>
            <div v-else>
                Article not found
            </div>
        </div>
    </div>
</template>

<script>
import {ARTICLE} from "../store/articles/actions";
import {ARTICLE_COMMENTS, STORE_ARTICLE_COMMENTS, ARTICLE_COMMENTS_ADDED} from "../store/comments/actions";
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
    data() {
        return {
            currentCommentPage:1,
            comment: '',
            theme: '',
            errors: {
                comment: false,
                theme: false
            }
        }
    },
    beforeMount() {
        this.$store.dispatch(ARTICLE, {slug: this.$route.params.slug});
        this.getArticleComments();
    },
    methods: {
        getArticleComments(page = 1) {
            this.currentCommentPage = page;
            this.$store.dispatch(ARTICLE_COMMENTS, {slug: this.$route.params.slug, page});
        },
        storeComment() {
            if (!this.comment) {
                this.errors.comment = true
            }
            if (!this.theme) {
                this.errors.theme = true
            }
            if (this.comment && this.theme) {
                this.$store.dispatch(STORE_ARTICLE_COMMENTS, {slug: this.$route.params.slug, comment: this.comment, theme: this.theme}).then(response => {
                    this.comment =  '';
                    this.theme = '';
                    if (this.currentCommentPage !== 1) {
                        this.getArticleComments();
                    } else {
                        this.$store.commit(ARTICLE_COMMENTS_ADDED, response.data);
                    }
                })
            }
        }
    },
    computed: {
        ...mapGetters([
            'article',
            'articleLoading',
            'articleComments',
            'articleCommentsLoading',
        ]),
    }
}
</script>

<style scoped>

</style>
