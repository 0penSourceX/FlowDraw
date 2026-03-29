export function drawCircle(ctx, x, y, radius, color = "black", lineWidth = 3 ,w,h) {
  
 if(ctx)
     {
    ctx.save() // for not influnce in the originall scene
    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);  
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "rgba(189, 186, 186, 0.5)";  
    ctx.fill();
    ctx.stroke();

    ctx.restore()


     }
    
}