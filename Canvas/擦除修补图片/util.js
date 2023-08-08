/** 修补渐变开始的颜色 */
export const REPAIR_POINT_INNER_COLOR = 'rgba(119,106,230,1)';
/** 修补渐变结束的颜色 */
export const REPAIR_POINT_OUTER_COLOR = 'rgba(119,106,230,0)';
/** 擦除渐变开始的颜色 */
export const ERASE_POINT_INNER_COLOR = 'rgba(255,255,255,1)';
/** 擦除结束的颜色 */
export const ERASE_POINT_OUTER_COLOR = 'rgba(255,255,255,0)';
/** 径向渐变开始圆形的半径 */
export const GRADIENT_INNER_RADIUS = 0;
/** 0° */
export const ZERO_DEGREES = 0;
/** 360° */
export const ONE_TURN_DEGREES = Math.PI * 2;
/** 渐变开始的偏移值 */
export const GRADIENT_BEGIN_OFFSET = 0;
/** 渐变结束的偏移值 */
export const GRADIENT_END_OFFSET = 1;

export function refresh(ctx, paths, drawImg) {
    // Clear canvas and draw the cat.
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (drawImg){
        ctx.drawImage(drawImg, 0, 0);
    }

    for (var i=0; i<paths.length; ++i) {
        let path = paths[i];

        if (path.length<1){
            continue; // Need at least two points to draw a line.
        }

        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let j=1; j<path.length; ++j){
            ctx.lineTo(path[j].x, path[j].y);
        }
        ctx.stroke();
    }
}
