<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <div>
            <router-link to="/"><img src="../../assets/images/logo.png" alt=""></router-link>
            <nav>
                <router-link to="/">教育</router-link>
                <router-link to="/">商品</router-link>
                <router-link to="/">活動</router-link>
                <router-link to="/">最新消息</router-link>
                <router-link to="/">關於我們</router-link>
                <router-link to="/"><img src="../../assets/images/icon_memder.svg" alt=""></router-link>
                <router-link to="/"><img src="../../assets/images/icon_shopping.svg" alt=""></router-link>
            </nav>
        </div>
    </header>
</template>

<style scoped>
header {
    background-color: #303030;

    div {
        max-width: 1200px;
        height: 85px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;

        img {
            height: 40px;
        }

        nav {
            display: flex;
            align-items: center;
            gap: 30px;

            a {
                color: #fff;
            }
        }

    }
}
</style>