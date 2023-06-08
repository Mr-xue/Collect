<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
        <input
            type="range"
            min="1"
            max="60"
            value="10"
            onchange="change(this)"
            oninput="slide(this)"
        />
        <span>{{ sw }}</span>
        <div id="time"></div>
        <canvas id="canvas" ref="canvas"></canvas>
    </div>
</template>
<style>
body{
    overflow: overlay;
}
</style>
<script>
import ImageStroke from 'image-stroke';
import contour from 'image-stroke/lib/method-contour';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'HomeView',
    components: {
        HelloWorld
    },
    data(){
        return {
            sw:10,
        }
    },
    mounted() {
        let strokeWidth = 10;
        let targetImage;
        const imageStroke = new ImageStroke();
        let color = '#ff7f50';

        const showPerf = () => {
            const startTime = performance.now();
            return () => {
                document.querySelector('#time').innerText =
                    Math.round(performance.now() - startTime) + 'ms';
            };
        };
        let { canvas } = this.$refs;
        const update = () => {
            const endPerf = showPerf();
            imageStroke.use(contour);
            let sw = ~~(strokeWidth)
            const result = imageStroke.make(targetImage, {
                thickness: sw, // 必须转为数字，字符串无效
                color: color
            });
            const ctx = canvas.getContext('2d');
            canvas.width = result.width / 2;
            canvas.height = result.height / 2;
            canvas.style.width = result.width  / 2+ 'px';
            canvas.style.height = result.height  / 2+ 'px';
            // ctx.drawImage(result, 0, 0);
            ctx.drawImage(result, 0, 0,result.width,result.height, -(sw/2), -(sw/2), result.width / 2, result.height / 2);
            endPerf();
        };
        const useImage = () => {
            const image = new Image();
            image.onload = () => {
                targetImage = image;
                update();
            };
            // image.src = require('./p1.png');
            image.src = require('./people.png');
            // image.src = require('./tree.png');
            // image.src = require('./demo.png');
        };
        useImage();

        window.change =  (e) => {
            strokeWidth = e.value;
            this.sw = e.value
            // update();
        };
        window.slide =  (e) => {
            console.log('输出',e.value);
            strokeWidth = e.value;
            this.sw = e.value
            update();
        }
    }
};
</script>
