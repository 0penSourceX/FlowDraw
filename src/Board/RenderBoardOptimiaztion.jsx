import { useEffect, useRef, useState } from "react";
import "./RenderBoardOptimiaztion.css";
import { quadrticCurver } from "./quadrticCurver";
import { simplify } from "./simplify";
import { buildPath } from "./buildPath";
import { DrawPoints } from "./DrawPoints";
import { Path } from "./PathQuee";
import { reset } from "./rest";
import { Colors } from "../BufferColor";
import CompPrams from "../Pramas/CompPrams";
import Button from "../Pramas/Setting";
import Setting from "../Pramas/Setting";
import Grid from "../Pramas/Grid";
import { drawCircle } from "./darwCircle";
import { drawCircles } from "./circleDrawSpecial";
 
const RenderBoardOptimiaztion = () => {
 
  const draw = useRef(null);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const Points = useRef([]);

  const isDrawingState = useRef(false);
  const [_, setx] = useState(0);
  const calc = useRef(0);
  const numberOfPage = useRef(0);
  let cord = useRef({ x: 0, y: 0 });
  const AllPath = useRef([]);
  let Buffer = useRef(new Path());
  let ErraserMode = useRef(false);

  const [sizeLine, setSizeLine] = useState(8);
  const [colorState, SetColorState] = useState("#122d5c");
  const [show, SetShow] = useState(false);
  const [ShowSetting,SetShowSetting] = useState(false)
  const [showFirstBox,SetShowFirstBox] = useState(false)
  const [hidenavbar,sethidenavbar] = useState(true)
  const [TranslateX,SetTranslateX] = useState(0)
  const [TranslateY,SetTranslateY] = useState(0)
  const [leftsideshow,Setleftsideshow] = useState(true)
  const [helper,SetHelper] = useState(1)
  const [mode,setmode ] = useState("pen")
let cordxerraser = useRef({x : 0,y:0})

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      calc.current += e.deltaY * 0.015;
      if (calc.current >= 10) {
        setx((prev) => prev + 1);
        calc.current = 0;
        numberOfPage.current += 1;
      }
      if (calc.current <= -10) {
        setx((prev) => prev + 1);
        calc.current = 0;
        if (numberOfPage.current > 0) {
          numberOfPage.current -= 1;
        }
      }
    };
    const element = draw.current;
    if (element) {
      element.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);
 
  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvas.current || !draw.current) return;
      const rect = draw.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.current.width = rect.width * dpr;
      canvas.current.height = rect.height * dpr;
      ctx.current = canvas.current.getContext("2d");
      ctx.current.setTransform(dpr, 0, 0, dpr, 0, 0);
     
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // do functions for all things do otptimze the good 
  useEffect(() => {
    const handelkeydown = (event) => {
      let easy = Buffer.current;
      event.preventDefault();

      if (event.ctrlKey && event.key.toLowerCase() == "z") {
        console.log("undeo")
       
      const svg = document.getElementById('svg');
      const paths = svg?.querySelectorAll('g'); 
      const lastPath = paths[paths.length - 1]
 
      const lastpathf =lastPath?.querySelector("path") 
       
 
       
      if(lastPath){
           const dataline  = {
          path : lastpathf?.getAttribute("d") , 
          color : lastpathf?.getAttribute('stroke') ,
          size : lastpathf?.getAttribute('stroke-width')
        }
 


         easy.handelTrash(dataline)
         lastPath.remove()
        }
      
      }


      
      if (event.ctrlKey && event.key.toLowerCase() == "v") {
           console.log("ctrlv")
         const objectOfpath =  easy.handelrendo()
         if(objectOfpath)  {  
            const {path,color,size} = objectOfpath
           DrawPoints(path,color,size);
   

         }

      }
    };
    document.addEventListener("keydown", handelkeydown);
    return () => {
      document.removeEventListener("keydown", handelkeydown);
    };
  }, []);
  useEffect(()=>{
    const ListenClick = ()=>{
      SetShowSetting(false)
      SetShowFirstBox(false)
      SetShow(false)
       
    }
      draw.current.addEventListener("click",ListenClick)

      return()=>{
        draw?.current?.removeEventListener("click",ListenClick)
      }
  },[])





















// do reaction and soound team board
// SAVE data in localStorage
// add block of p text please


let fastcount = useRef(0)
  const HandelMove = (e) => {

  const BoundriesDrawx = draw.current.getBoundingClientRect();
 

    if(ErraserMode.current){
           
            if(fastcount.current>33){
               fastcount.current = 0
                ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

            } 
     
          const x1 = e.clientX - BoundriesDrawx.left;
          const y2 = e.clientY - BoundriesDrawx.top
          cordxerraser.current.x = x1 
          cordxerraser.current.y = y2 



          let midxx =  (cordxerraser.current.x + x1) / 2;
          let midyy =  (cordxerraser.current.y + y2) / 2;
          
         

          quadrticCurver(
            ctx.current, 
            cordxerraser.current.x,
            cordxerraser.current.y,
            midxx,
            midyy,
            x1,
            y2,
            "#b0b1b5",
            10,
          );
          fastcount.current+=1
          

    }
 
    // const xx = e.clientX -draw.current.getBoundingClientRect().left
    // const yy = e.clientY -draw.current.getBoundingClientRect().top
    
    // !isDrawingState.current  &&    drawCircle(ctx.current,xx,yy,12,"#808080",1,canvas.current.width, canvas.current.height)

    if (!isDrawingState.current || ErraserMode.current) return;
    // show  &&   SetShow(false)


    const BoundriesDraw = draw.current.getBoundingClientRect();


    const events = e.getCoalescedEvents?.() || [e];
    for (let i = 0; i < events.length; i++) {

      const x = events[i].clientX - BoundriesDraw.left;
      const y = events[i].clientY - BoundriesDraw.top;
   
      const dx = x - cord.current.x;
      const dy = y - cord.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 2) return;
      const midx = (cord.current.x + x) / 2;
      const midy = (cord.current.y + y) / 2;
      quadrticCurver(
        ctx.current,
        cord.current.x,
        cord.current.y,
        midx,
        midy,
        x,
        y,
        colorState,
        sizeLine,
      );
      Points.current.push({ x, y });
      cord.current.x = x;
      cord.current.y = y;
    }
  };





 





  const HandelDown = (e) => {
    isDrawingState.current = true;
 
    
    const BoundriesDraw = canvas.current.getBoundingClientRect();
    // ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    const { clientX, clientY } = e;
    const x = clientX - BoundriesDraw.left;
    const y = clientY - BoundriesDraw.top;
    // drawCircles(ctx.current, x,y, sizeLine, colorState, sizeLine) off it
    cord.current.x = x;
    
    cord.current.y = y;

    // cordxerraser.current.x = x 
    // cordxerraser.current.y = y 
  };
 










































function clear(){
     const rect = draw.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.current.width = rect.width * dpr;
      canvas.current.height = rect.height * dpr;
      ctx.current = canvas.current.getContext("2d");
      ctx.current.setTransform(dpr, 0, 0, dpr, 0, 0);
}









  const HandelPointerUp = (e) => {
     clear()
 
    if(ErraserMode.current){
      return 
    }
    isDrawingState.current = false;
    
    let reduced = simplify(Points.current, 2);
    reduced.length > 0 && AllPath.current.push(reduced);

    const d = buildPath(reduced);

       if(d==""){
 
         const cx = cord.current.x; 
         const cy = cord.current.y
         const r = 5;  
         const circlePath = `M ${cx + r}, ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} `;
           const batman  = {
             path : circlePath , 
             color : colorState,
             size : sizeLine
           }
 
          Buffer.current.HandelPushPaths(batman)
          DrawPoints(circlePath, colorState, sizeLine);
        
       }


    if(d=="") return
    
    const CollectLine  = {
      path : d , 
      color : colorState,
      size : sizeLine
    }
   
    Buffer.current.HandelPushPaths(CollectLine)
   
    DrawPoints(d, colorState, sizeLine);
    Points.current = [];
   
    
  };




















































// fixing bug by force it        style={{zIndex:ErraserMode.current ? "0":"1"}} 


  const handelChangeColor = (color) => {
 
    SetShow(false);
    SetColorState(color);
  };
  const HandelFuture = () => {
    let easy = Buffer.current;
   
       const objectOfpath =  easy.handelrendo()
         if(objectOfpath)  {  
            const {path,color,size} = objectOfpath
           DrawPoints(path,color,size);
         }
  };
  const HandelPasst = () => {
    let easy = Buffer.current;


      
      const svg = document.getElementById('svg');
      const paths = svg?.querySelectorAll('g'); 
      const lastPath = paths[paths.length - 1]
 
      const lastpathf =lastPath?.querySelector("path") 
       
 
       
      if(lastPath){
           const dataline  = {
          path : lastpathf?.getAttribute("d") , 
          color : lastpathf?.getAttribute('stroke') ,
          size : lastpathf?.getAttribute('stroke-width')
        }
 


         easy.handelTrash(dataline)
         lastPath.remove()
        }
  
  } 
  const HandelChangeGrid = (type)=>{
    if(type =="noGrid"){
       draw.current.style.backgroundColor = '#121212';
       draw.current.style.backgroundImage = 'none';
       draw.current.style.backgroundSize = '';
       draw.current.style.backgroundPosition = '';
    }
    else if (type =="Linegrid"){
       draw.current.style.backgroundColor = 'rgb(228, 225, 225)';
       draw.current.style.backgroundSize = '40px 40px';
       draw.current.style.backgroundImage = `
      linear-gradient(to right, #d2caca 1px, transparent 1px),
      linear-gradient(to bottom, #d2caca 1px, transparent 1px)
    ` 
    }
    else if(type =="Dot"){
    draw.current.style.backgroundColor = 'rgb(228, 225, 225)';
    draw.current.style.backgroundImage = 'radial-gradient(rgba(5, 4, 4, 0.17) 2px, transparent 0)';
    draw.current.style.backgroundSize = '30px 30px';
    draw.current.style.backgroundPosition = '-5px -5px';
    }



  }

 useEffect(()=>{
    draw.current.style.backgroundColor = 'rgb(228, 225, 225)';
       draw.current.style.backgroundSize = '40px 40px';
       draw.current.style.backgroundImage = `
      linear-gradient(to right, #d2caca 1px, transparent 1px),
      linear-gradient(to bottom, #d2caca 1px, transparent 1px)
    ` 

 },[])
 const HandelOption = (type) =>{
     if(type=="HideNavbar"){
      sethidenavbar((prev)=>!prev)
      SetShowSetting(false)
      Setleftsideshow((prev)=>!prev)
     }
  if(type=="grid"){
    SetShowFirstBox(true)
  }
 }
   
 
 


 const handelMouseUp = ()=>{
  isDrawingState.current = false 
  
 }
 // do search if you can imedtily delte the item
 const handelPointerLine = (e)=>{
      
    const  {d,stroke} = e.target.attributes
    const strokeWidth = e.target.getAttribute('stroke-width');
    const BoundriesDraw = canvas.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const x = clientX - BoundriesDraw.left;
    const y = clientY - BoundriesDraw.top;
    cord.current.x = x;
    cord.current.y = y;

    const LinesCord = {
      path:d.value,
      color:stroke.value,
      size:Number(strokeWidth)

    }
    Buffer.current.handelTrash(LinesCord)
 
   
 
//  e.target.style.transform ="translate(40px,40px)"
     e.target.remove()
     console.log(e.target)
    
  
 
 }
 
  function baaaaaatamn  (mode){
    switch(mode){
      case "pencil":
        return "d.png"
      case  "pen":
        return "b.png"
      case "eraser":
        return "h.png"
    }
  }
   //onMouseEnter={()=>  ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height)}

  return (
    <>
     
      {hidenavbar &&  
      <div className="navbar">
        <span className="o">
          OpenSourceX {numberOfPage.current}
          <img src="openSource.png" alt="logo" />
        </span>

        <span >Untitled</span>
     
        <button >Share</button>
      </div> }

      <div className="draw"
      style={{ cursor: `url('./controllers/${baaaaaatamn(mode)}') 3 32, auto` }}
      ref={draw}>
        <canvas
          id="Layer1"
          ref={canvas}
          onPointerMove={(e) => HandelMove(e)}
          onPointerDown={(e) => HandelDown(e)}
          onPointerUp={(e) => HandelPointerUp(e)}
          style={{zIndex:ErraserMode.current ? "0":"1"}}
        ></canvas>

 
        <svg id="svg"
        
        onMouseUp={()=>handelMouseUp()}
        onPointerMove={(e)=>handelPointerLine(e)}>

          {/* <g style={{ transform: `translate(${TranslateX}px, ${TranslateY}px)` }}>

          </g> */}
        </svg>  




      </div>

    {leftsideshow && 
    
      <div className="leftSide" onPointerEnter={()=>{

      isDrawingState.current = false

      }}>
 

        <div className="FatherImages" draggable={false}>
          <img src="./leftSIdeImages/a.svg" draggable={false} />
        </div>
          <div className="FatherImages">
          <img src="./leftSIdeImages/c.svg" draggable={false} />
        </div>
        <div

          className="FatherImages rotation"
          onClick={() => {
            SetShow((prev) => !prev)
            ErraserMode.current = false
            SetHelper((prev)=>prev+1)
            isDrawingState.current = false
            setmode("pen")
            ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
          }}

        >
          <img src="./leftSIdeImages/b.svg" draggable={false} />
        </div>
          <div className="FatherImages" onClick={() => {
            ErraserMode.current = true
            SetHelper((prev)=>prev+1)

            setmode("eraser")

          }}>
         <img src="./leftSIdeImages/f.svg" draggable={false} />
        </div>
       <div className="FatherImages" onClick={() => reset(document)}>

         <img src="./leftSIdeImages/h.svg" draggable={false} />
        </div>

        <div className="FatherImages">
          <img src="./leftSIdeImages/d.svg" draggable={false} />
        </div>
        <div className="FatherImages">
          <img src="./leftSIdeImages/e.svg" draggable={false} />
        </div>
        <div className="FatherImages" onClick={() => HandelFuture()}>
          <img src="./leftSIdeImages/redo.svg" draggable={false} />
        </div>
        <div className="FatherImages" onClick={() => HandelPasst()}>
          <img src="./leftSIdeImages/undo.svg" draggable={false} />
        </div>
      

      </div>
      
      
      }
      {show && (
        <div className="pickColor">
          <div className="range1">
            <input
              type="range"
              onChange={(e) => setSizeLine(e.target.value)}
              id="vol"
              name="vol"
              min="2"
              max="150"
            />
            <div className="value">{sizeLine}</div>
          </div>
          <span className="title-color">All Colors</span>
          <div className="containerColors">
            {Colors.map((color) => (
              <div
                onClick={() => handelChangeColor(color)}
                key={color}
                className="circle-c"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
      )}
   
    {ShowSetting &&   <CompPrams onpassvalue={(e)=>HandelOption(e)}/>   }
     {!ShowSetting &&  <Setting send ={()=>SetShowSetting(true)}/>}

      {showFirstBox &&      <Grid passValue ={(e)=>HandelChangeGrid(e)}/>}
    </>
  );
};

export default RenderBoardOptimiaztion;
