<template>
    <div>
        <i class="glyphicon glyphicon-eye-open"></i>
        <span>{{ article.views_count }}</span>
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
