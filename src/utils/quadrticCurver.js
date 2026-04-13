 
//@ this handel the draw curve
// author @ghaith nahdi
//@MIT lisence
export function quadrticCurver (ctx,oldx,oldy,midx,midy,x,y,color,linewidth){
    ctx.save()
    ctx.beginPath();
    ctx.moveTo(oldx, oldy);
    ctx.quadraticCurveTo(midx, midy, x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = linewidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.restore()
    
}


