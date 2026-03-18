 export function DrawPoints(path,color = "black",size,ref){
    
 const  path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");


  path1.setAttribute("stroke",color);
  path1.setAttribute("stroke-width", size);
  path1.setAttribute("fill", "none");
  path1.setAttribute("stroke-linecap", "round");
  path1.setAttribute("stroke-linejoin", "round");
  path1.setAttribute("d", path);
  path1.setAttribute('vector-effect', 'non-scaling-stroke');
 
  path1.style.pointerEvents = "stroke";
 
 if(ref){
     path1.addEventListener("mouseover", () => ref(path) );

}
 

 
 
 
const g = document.querySelector("svg");
g.appendChild(path1);

    

}
