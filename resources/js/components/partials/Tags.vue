<template>
    <div>
         <span v-for="tag in article.tags" class="badge badge-secondary" @click="$router.push({name:'articles.tag', params:{'tag': tag.slug}})">
            {{ tag.name}}
        </span>
    </div>
</template>

<script>
export default {
    name: "Tags",
    props:[
        'article'
    ]
}
</script>

<style scoped>

</style>
