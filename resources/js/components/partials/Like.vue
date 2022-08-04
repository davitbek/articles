<template>
    <div>
        <span class="glyphicon glyphicon-heart"></span>
        <span>{{ article.likes_count }}</span>
    </div>
</template>

<script>
export default {
    name: "Like",
    props:[
        'article'
    ]
}
</script>

<style scoped>

</style>
