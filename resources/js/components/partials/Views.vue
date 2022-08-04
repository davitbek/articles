<template>
    <span>
        <i class="glyphicon glyphicon-eye-open"></i>
        <span>{{ article.views_count }}</span>
    </span>
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
