<template>
    <i :class="['fa', 'text-secondary','fa-spinner','fa-spin', spinSize ?  `fa-${spinSize}x`: `fa12x`, 'animate-spin']"></i>
</template>

<script>
export default {
    name: "Loading",
    props:[
        'spinSize'
    ]
}
</script>

<style scoped>

</style>
