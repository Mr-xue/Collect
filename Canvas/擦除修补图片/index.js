import { refresh } from './util.js';

// 设置擦除、修补模式
let model = 'source-over';
function recover() {
    model = 'source-over';
}
window.eraser = function () {
    model = 'destination-out';
}
/* function eraser() {
    model = 'destination-out';
} */

document.addEventListener('DOMContentLoaded', function () {
    // 获取canvas上下文
    const canvas = document.getElementById('inputCanvas'),
        outCanvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d'),
        outCtx = outCanvas.getContext('2d');

    // canvas绘制底图
    const img = new Image();
    img.src = '../suolong.jpeg';
    img.onload = function () {
        // 创建Canvas元素
        canvas.width = outCanvas.width = img.width;
        canvas.height = outCanvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        outCtx.drawImage(img, 0, 0);
    };

    // 画布绑定事件
    let isDrawing = false;
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);

    // 存储每次绘制路径
    let paths = [];
    function startDrawing(e) {
        paths.push([{x: e.offsetX, y:e.offsetY}])
        ctx.globalCompositeOperation = model;

        isDrawing = true;
        // 设置线条样式
        ctx.strokeStyle = 'rgba(235,55,57,.3)';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round'; // 线条末端添加圆形线帽，减少线条的生硬感
        ctx.lineJoin = 'round'; // 线条交汇时为原型边角
        ctx.shadowBlur = 1; // 利用阴影，消除锯齿
        ctx.shadowColor = 'rgb(235,55,57)';

        draw(e);
    }

    function stopDrawing(e) {
        isDrawing = false;
    }

    // 鼠标移动绘制
    function draw(e) {
        if (!isDrawing) return;
        paths[paths.length - 1].push({ x: e.offsetX, y: e.offsetY });

        refresh(ctx, paths, img, model); // 重绘源画布
        refresh(outCtx, paths, img, model); // 重绘目标画布

    }
    // 复合模式
    // ctx.globalCompositeOperation = moel;

    document.querySelector('#save').onclick = function () {
        canvas.toBlob((blob) => {
            const a = document.createElement('a');
            document.body.append(a);
            a.download = `擦除.png`;
            a.href = URL.createObjectURL(blob);
            a.click();
            URL.revokeObjectURL(a.href);
            a.remove();
        });
    };
});
