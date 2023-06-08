const { createApp } = Vue;

createApp({
    data() {
        return {
            pageWidth: 0, //页面宽度
            listType:'',
        };
    },
    mounted() {
        // 获取页面宽度
        this.pageWidth = document.body.offsetWidth;
        // 实例化视差插件
        Atropos({ el: '.my-atropos' });
    },
    methods: {
        showList(type) {
            this.listType = type;
        }
    }
}).mount('#app');
