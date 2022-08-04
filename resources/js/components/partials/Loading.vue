<template>
    <div class="col-12 text-center p-4">
        Loading...
        <i :class="['fa', 'text-secondary','fa-spinner','fa-spin', spinClass ?  `fa-${spinClass}x`: `fa-4x`, 'animate-spin']"></i>
    </div>
</template>

<script>
export default {
    name: "Loading",
    props:[
        'spinClass'
    ]
}
</script>

<style scoped>

</style>
