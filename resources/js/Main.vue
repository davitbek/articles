<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <router-link :to="{name:'home'}">
                    <a class="navbar-brand" href="#">Home</a>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link :to="{name:'articles'}">
                            <a class="nav-link active" aria-current="page" href="#">Articles</a>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <router-view ></router-view>
    </div>
</template>

<script>

export default {
    name: "Main",
}
</script>
<style scoped>

</style>
