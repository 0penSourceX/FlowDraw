export function drawCircles(ctx, x, y, radius, color = "black", lineWidth = 3) {
  


    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2); // full circle
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = color 
    ctx.fill();
    ctx.stroke();

 

    
     }
    
