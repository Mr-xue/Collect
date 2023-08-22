import {LINE_COLOR, LINE_OPACITY, LINE_WIDTH} from './options.js';

/**
 *
 * 设置擦除线条的样式
 * @param {CanvasRenderingContext2D} ctx - 画布上下文
 */
function setLineStyle(ctx) {
    ctx.globalAlpha = LINE_OPACITY;
    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = 'round'; // 线条末端添加圆形线帽，减少线条的生硬感
    ctx.lineJoin = 'round'; // 线条交汇时为原型边角
    // 利用阴影，消除锯齿
    ctx.shadowBlur = 1;
    ctx.shadowColor = 'rgb(235,55,57)';
}

/**
 * 刷新指定画布
 *
 * @param {CanvasRenderingContext2D} ctx - 画布的渲染上下文
 * @param {Array} paths - 要在画布上绘制的路径的数组
 * @param {HTMLImageElement} drawImg - 要在画布上绘制的图像
 * @param {String} model - 要设置的全局合成操作
 */
export function refresh(ctx, paths, drawImg, model) {
    // 清空画布
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = model;

    // 离屏绘制
    const offscreenCanvas = document.createElement('canvas');
    const offCtx = offscreenCanvas.getContext('2d');
    offscreenCanvas.width = ctx.canvas.width;
    offscreenCanvas.height = ctx.canvas.height;
    offCtx.drawImage(drawImg, 0, 0);

    for (var i = 0; i < paths.length; ++i) {
        let path = paths[i];

        if (path.length < 1){
            continue; // Need at least two points to draw a line.
        }

        offCtx.beginPath();
        setLineStyle(offCtx);
        offCtx.moveTo(path[0].x, path[0].y);
        for (let j = 1; j < path.length; ++j){
            offCtx.lineTo(path[j].x, path[j].y);
        }
        offCtx.stroke();
    }
    ctx.drawImage(offscreenCanvas,0,0)
}
