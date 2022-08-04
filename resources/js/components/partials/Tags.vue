<template>
    <div>
         <span v-for="tag in article.tags" class="badge badge-secondary mr-2" @click="goArticlesTagPage(tag)">
            {{ tag.name}}
        </span>
    </div>
</template>

<script>
export default {
    name: "Tags",
    props:[
        'article'
    ],
    methods: {
        goArticlesTagPage(tag) {
            if (this.$route.name !== 'articles.tag' || this.$route.params.slug !== tag.slug) {
               this.$router.push({name:'articles.tag', params:{'slug': tag.slug}})
            }
        }
    }
}
</script>

<style scoped>

</style>
