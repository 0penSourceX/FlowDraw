 export function DrawPoints(path,color = "black",size){
  if(path){
 const  path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");


  path1.setAttribute("stroke",color);
  path1.setAttribute("stroke-width", size);
  path1.setAttribute("fill", "none");
  path1.setAttribute("stroke-linecap", "round");
  path1.setAttribute("stroke-linejoin", "round");
  path1.setAttribute("d", path);
  path1.style.pointerEvents = "stroke" 

  const Gpath = document.createElementNS("http://www.w3.org/2000/svg", "g");
  Gpath.appendChild(path1);
  Gpath.style.transform="scale(1,1)"
  Gpath.style.transform = "translate(0px,0px)";
  const g = document.querySelector("svg");
  
  console.log(Gpath)
  g.appendChild(Gpath)
  }

    

}
