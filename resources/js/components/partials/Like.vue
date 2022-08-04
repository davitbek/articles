<template>
    <div @click.stop="articleLike">
        <span class="glyphicon glyphicon-heart"></span>
        <span>{{ article.likes_count }}</span>
    </div>
</template>

<script>
import {ARTICLE_LIKE, ARTICLES_UPDATED} from "../../store/articles/actions";

export default {
    name: "Like",
    props:[
        'article'
    ],
    methods: {
        articleLike() {
            this.$store.dispatch(ARTICLE_LIKE, {slug: this.article.slug}).then(response => {
                if (response.success) {
                    this.$store.commit(ARTICLES_UPDATED, {
                        [this.article.slug]: {likes_count: this.article.likes_count + 1}
                    });
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
