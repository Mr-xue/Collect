const { createApp } = Vue;

createApp({
    data() {
        return {
            message: 'Hello Vue!',
            pageWidth: 0
        };
    },
    mounted() {
        this.getSize();
        const myAtropos = Atropos({
            el: '.my-atropos'
            // rest of parameters
        });
        // this.addMouseEvent();
    },
    methods: {
        getSize() {
            this.pageWidth = document.body.offsetWidth;
        },
        addMouseEvent() {
            let wrap = document.querySelector('.lang'),
                wrapInfo = wrap.getBoundingClientRect(),
                left = wrapInfo.left,
                top = wrapInfo.top,
                width = wrap.offsetWidth,
                height = wrap.offsetHeight;

            wrap.addEventListener('mousemove', function (e) {
                const { clientX, clientY } = e;
                // 最大旋转角度
                const maxRotate = 20;

                // 原点位置
                const centerX = width / 2;
                const centerY = height / 2;

                // 鼠标位置相对卡片左上角的坐标
                const offsetX = clientX - left;
                const offsetY = clientY - top;

                // 将和原点的距离线性折算成旋转角度
                // 📢 X 方向移动旋转 Y 轴，Y 方向移动旋转 X 轴
                let rotateX =
                    ((maxRotate * (offsetY - centerY)) / centerY) * -1;
                let rotateY = (maxRotate * (offsetX - centerX)) / centerX;
                rotateX = Math.min(maxRotate, rotateX);
                rotateY = Math.min(maxRotate, rotateY);
                // 设置 CSS Variables
                wrap.style.setProperty('--rotateX', rotateX);
                wrap.style.setProperty('--rotateY', rotateY);
            });

            wrap.addEventListener('mouseleave', function (e) {
                wrap.style.setProperty('--rotateX', 0);
                wrap.style.setProperty('--rotateY', 0);
            });
        }
    }
}).mount('#app');
