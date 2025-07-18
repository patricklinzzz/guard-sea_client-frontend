<script setup>

</script>

<template>
    <footer>
        <div id="container">
            <div id="footer_img">
                <img src="../../assets/images/logo_white.png" alt="">
                <div id="social_media_icon">
                    <a href=""><img src="../../assets/images/footer/line.svg" alt=""></a>
                    <a href=""><img src="../../assets/images/footer/facebook.svg" alt=""></a>
                    <a href=""><img src="../../assets/images/footer/instagram.svg" alt=""></a>
                    <a href=""><img src="../../assets/images/footer/email.svg" alt=""></a>
                </div>
            </div>
            <div>
                本網站為緯育TibaMe前端工程師班學員專題作品，本平台僅供學習、展示之用。若有侵權疑慮, 您可以私訊 [<a href="https://www.facebook.com/TibaMe"
                    target="_blank">緯育</a>] ,後續會由專人協助處理。
            </div>
            <div>&copy; 2025 GuardSea. All rights reserved.</div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
footer {
    font-size: 14px;
    color: #fff;
    background-image: url(../../assets/images/footer/footer_bg.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 415px;

    @include respond(sm) {
        background-image: url(../../assets/images/footer/footer_bg2.svg);
        height: 327px;
        background-size: contain;
        background-repeat: repeat-x;
    }

    #container {
        height: inherit;
        width: 90vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        margin: auto;

        @include respond(sm) {
            align-items: flex-start;
            gap: 10px;
        }

        a {
            color: #fff;
        }
    }
}

#footer_img {
    width: 60vw;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    @include respond(sm) {
        flex-direction: column;
        align-items: flex-start;
        width: 90vw;
        gap: 10px;
    }
}

#social_media_icon {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    a {
        display: flex;
        align-items: center;

        img {
            @include respond(sm) {
                width: 28px;
            }
        }
    }
}
</style>