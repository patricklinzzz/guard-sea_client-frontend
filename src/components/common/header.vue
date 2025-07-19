<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <div>
            <router-link to="/"><img src="../../assets/images/logo.png" alt=""></router-link>
            <nav id="desktop_nav">
                <router-link to="/edu">教育</router-link>
                <router-link to="/">商品</router-link>
                <router-link to="/">活動</router-link>
                <router-link to="/">最新消息</router-link>
                <router-link to="/">關於我們</router-link>
                <router-link to="/"><img src="../../assets/images/header/icon_memder.svg" alt=""
                        width="40"></router-link>
                <router-link to="/"><img src="../../assets/images/header/icon_shopping.svg" alt=""
                        width="34"></router-link>
            </nav>
            <nav id="mobile_nav">
                <router-link to="/"><img src="../../assets/images/header/icon_memder.svg" alt=""
                        width="40"></router-link>
                <router-link to="/"><img src="../../assets/images/header/icon_shopping.svg" alt=""
                        width="34"></router-link>
                <div id="hamburger">
                    <img src="../../assets/images/header/icon_hamburger.svg" alt="" width="40">
                </div>
            </nav>
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
    background-color: v.$color-blue-dark;

    #navbar {
        max-width: 1200px;
        height: 85px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        padding-left: 30px;
        padding-right: 30px;

        @include respond(md) {
            padding-left: 15px;
            padding-right: 15px;
        }

        img {
            display: flex;
            justify-content: center;

            @include respond(md) {
                width: 30px;
            }
        }

        #logo {
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: center;
        }

        #desktop_nav {
            display: flex;
            align-items: center;
            gap: 30px;

            @include respond(md) {
                display: none;
            }

            a {
                color: #fff;
                text-decoration-line: none;
            }
        }

        #mobile_nav {
            display: none;
            align-items: center;
            gap: 10px;

            @include respond(md) {
                display: flex;
            }

            a {
                color: #fff;
                text-decoration-line: none;
            }
        }

    }
}
</style>