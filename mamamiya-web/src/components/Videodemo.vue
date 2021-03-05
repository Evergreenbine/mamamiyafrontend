<template>
    <div>
        <video autoplay controls width="100%" height="500" id="videoElement"></video>
    </div>
</template>

<script>
    import flvjs from 'flv.js'

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        mounted() {
            this.$nextTick(() => {
                this.createVideo()
            })
        },
        methods: {
            createVideo() {
                if (flvjs.isSupported()) {
                    var videoElement = document.getElementById('videoElement');
                    var flvPlayer = flvjs.createPlayer({
                        type: 'mp4',
                        url: 'http://localhost:8003/static/mamamiya202103050414311878.MP4' //你的url地址
                    });
                    flvPlayer.attachMediaElement(videoElement);
                    flvPlayer.load();
                    flvPlayer.play();
                }
            }
        }
    }
</script>
