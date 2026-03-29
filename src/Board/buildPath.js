export function buildPath(points) {

  if (points.length === 0) return ""; // can you do circle with svg here if the point of length  =0 

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  if (points.length === 3) {
    return `M ${points[0].x} ${points[0].y} Q ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y}`;
  }
  if(points.length ===4){
      let d = `M${points[0].x} ${points[0].y}`;
      for (let j = 1; j < points.length; j++) {
        let prev = points[j - 1];
        let curr = points[j];
        d =
          d +
          `Q${(prev.x + curr.x) / 2} ${(prev.y + curr.y) / 2} ${curr.x} ${curr.y}`;
      }
      return d
  }

  // Catmull-Rom for 4+
 // Catmull-Rom for 4+
const pts = [
  points[0],
  ...points,
  points[points.length - 1]
];
 


let d = `M ${pts[1].x} ${pts[1].y}`;

for (let i = 0; i < pts.length - 3; i++) {

  let p0 = pts[i];
  let p1 = pts[i+1];
  let p2 = pts[i+2];
  let p3 = pts[i+3];

  let cp1x = p1.x + (p2.x - p0.x) / 6;
  let cp1y = p1.y + (p2.y - p0.y) / 6;

  let cp2x = p2.x - (p3.x - p1.x) / 6;
  let cp2y = p2.y - (p3.y - p1.y) / 6;

  d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
}

return d;

 
}