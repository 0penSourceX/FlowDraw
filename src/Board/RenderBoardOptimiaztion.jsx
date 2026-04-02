import { useEffect, useRef, useState } from "react";
 
import "./RenderBoardOptimiaztion.css";
import { quadrticCurver } from "../utils/quadrticCurver";
import { simplify } from "./simplify";
import { buildPath } from "../utils/buildPath";
import { DrawPoints } from "../utils/DrawPoints";
import { Path } from "../utils/PathQuee";
import { reset } from "./rest";
import { Colors } from "../BufferColor";
import CompPrams from "../Pramas/CompPrams";
import Button from "../Pramas/Setting";
import Setting from "../Pramas/Setting";
import Grid from "../Pramas/Grid";
import { drawCircle } from "../utils/darwCircle";
import { drawCircles } from "../utils/circleDrawSpecial";
import { DrawText } from "../utils/addtext";
import { getDynamicLineWidth } from "../utils/dynamicline";
import SettingsModal from "../Pramas/SettingsModal"
import ShortcutsHint from "../Component/ShortcutsHint";
const RenderBoardOptimiaztion = () => {
 
 let HelperSlide = useRef({x:0,y:0})

 


 
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

  const [sizeLine, setSizeLine] = useState(6);
  const [colorState, SetColorState] = useState("#122d5c");
  const [show, SetShow] = useState(false);
  const [ShowSetting,SetShowSetting] = useState(false)
  const [showFirstBox,SetShowFirstBox] = useState(false)
  const [hidenavbar,sethidenavbar] = useState(true)
   
  const [leftsideshow,Setleftsideshow] = useState(true)
  const [helper,SetHelper] = useState(1)
  const [mode,setmode ] = useState("pen")

  const textmode  = useRef(false)
  const cursormode = useRef(false)
  let cordxerraser = useRef({x : 0,y:0})
  const [clickabletext,Setclickabletext] = useState(false)
  const [newcord,setnewcord] = useState({x: 0 ,y : 0})
 
  const String = useRef("")

  const lastCordImage =useRef({x: 0 , y :0})
  const isMovingInfrastcture = useRef(false)
  const lastCordMoveImage =useRef({x: 0 , y :0})
   
  const [shortcut,Setshortcut] = useState(false)

 


  const [images, setImages] = useState([]);
 
  useEffect(() => {
    const handlePaste = (event) => {
      event.preventDefault();

      const items = event.clipboardData.items;
  
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const blob = item.getAsFile();
          console.log(blob)
   
          const url = URL.createObjectURL(blob);
           const img = new Image();

          img.onload = () => {
            console.log("Width:", img.width);
            console.log("Height:", img.height);
                
            document.querySelector("svg").innerHTML += `
            <g style=" transform: translate(${lastCordImage.current.x == 0 ? canvas.current.width/2 : lastCordImage.current.x-100}px, ${lastCordImage.current.y == 0 ? canvas.current.height : lastCordImage.current.y}px); pointer-events: stroke;"> 
             <image   height=${img.height>800 ?  800:img.height}  width=${img.width>1700 ?  1700:img.width}  href=${url}  /> </g>`;
            URL.revokeObjectURL(url); // clean up
            };
           img.src = url;


   

          setImages((prev) => [...prev, url]);
        }
      }

      
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

 useEffect(()=>{
 const ProtectAfterRelod = () =>{
  const arrayOfPath =  localStorage?.getItem("paths")
  if(arrayOfPath){
    const getSerlaizedArray = JSON.parse(arrayOfPath)
     getSerlaizedArray.forEach(element => {
      const {path,color,size} = element
 
       DrawPoints(path, color, size);
     });
  }
 }
 ProtectAfterRelod()
 
 },[])




const handelsvgdown = (e)=>{

    const helperBoundries = draw.current.getBoundingClientRect();
    const x = e.clientX - helperBoundries.left;
    const y = e.clientY - helperBoundries.top;

    isMovingInfrastcture.current = true 
  
    HelperSlide.current.x =x  
    HelperSlide.current.y =y  

   console.log("start moving",HelperSlide.current)
}






useEffect(()=>{

  const HandelContextMenu = (e)=>{
     isDrawingState.current = false
    console.log("this event fired")
  } 

  window.addEventListener("contextmenu",HandelContextMenu)


return()=>{
  window.removeEventListener("contextmenu",HandelContextMenu)
}

},[])






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

 
  useEffect(() => {
    const handelkeydown = (event) => {
      let easy = Buffer.current;
 

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

      let arr = localStorage.getItem("paths")  
      if(arr){
        const removeLastChild = JSON.parse(arr)
          removeLastChild.pop();
          localStorage.setItem("paths", JSON.stringify(removeLastChild));
          console.log("should bne redraw all thing")
          reset(document)
          removeLastChild.forEach((item)=>{
            DrawPoints(item.path,item.color,item.size)
          })
          
      }
     

 



      }


      
      if (event.ctrlKey && event.key.toLowerCase() == "s") {
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
      Setshortcut(false)
       
    }
      draw.current.addEventListener("click",ListenClick)

      return()=>{
        draw?.current?.removeEventListener("click",ListenClick)
      }
  },[])




















 

let fastcount = useRef(0)
  const HandelMove = (e) => {


       
    const boundriesimages = draw.current.getBoundingClientRect();
 
 
 

      const x = e.clientX - boundriesimages.left;
      const y = e.clientY - boundriesimages.top;

      lastCordImage.current.x = x 
      lastCordImage.current.y = y 
       






   
    if(ErraserMode.current &&  textmode.current == false ){

    const BoundriesDrawx = draw.current.getBoundingClientRect();
 
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
 
    //  const xx = e.clientX -draw.current.getBoundingClientRect().left
    //  const yy = e.clientY -draw.current.getBoundingClientRect().top
    // solution    !isDrawingState.current && !ErraserMode.current   &&  (  drawCircle(ctx.current,xx,yy,12,"#808080",1,canvas.current.width, canvas.current.height))
    
    // !isDrawingState.current  &&    drawCircle(ctx.current,xx,yy,12,"#808080",1,canvas.current.width, canvas.current.height)

    if (!isDrawingState.current || ErraserMode.current ||  cursormode.current || textmode.current) return;
    // show  &&   SetShow(false)

       
    const BoundriesDraw = draw.current.getBoundingClientRect();
    // try to change the buzze curve with catmual curve to make the line moregood 

    const events = e.getCoalescedEvents?.() || [e];
    for (let i = 0; i < events.length; i++) {

      const x = events[i].clientX - BoundriesDraw.left;
      const y = events[i].clientY - BoundriesDraw.top;
   
      const dx = x - cord.current.x;
      const dy = y - cord.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const linewidth = getDynamicLineWidth({x:cord.current.x,y:cord.current.y}, {x,y})
     // console.log(linewidth,"line")
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

 
    Setclickabletext(true)
    isDrawingState.current = true;
    const BoundriesDraw = canvas.current.getBoundingClientRect();
     ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    const { clientX, clientY } = e;
    const x = clientX - BoundriesDraw.left;
    const y = clientY - BoundriesDraw.top;
    setnewcord({x,y})
    cord.current.x = x;
    cord.current.y = y;
    lastCordImage.current.x = x 
    lastCordImage.current.y = y 
     if(textmode.current){
      console.log("this text mode",{x,y})
     //   DrawText("we love porn hub",x,y,   "black",  33,  "start")
    }

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

    isMovingInfrastcture.current==false  
    isDrawingState.current = false;
    if(ErraserMode.current){
      return 
    }
  
    
    let reduced = simplify(Points.current, 2);
    

    const d = buildPath(reduced);
      // && isDrawingState.current == true 
       if(d=="" &&  cursormode.current ==false && textmode.current == false ){
 
         const cx = cord.current.x; 
         const cy = cord.current.y
         const r = 1;  
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
 
    AllPath.current.push(CollectLine)


    const pathsLocalStorage = localStorage.getItem("paths")


    if(pathsLocalStorage ){
      const merge  = JSON.parse(pathsLocalStorage)
      merge.push(CollectLine)
     
    localStorage.setItem("paths", JSON.stringify(merge) )     
    }else{
     localStorage.setItem("paths",JSON.stringify(AllPath.current)) 
    }
  
    DrawPoints(d, colorState, sizeLine);
    Points.current = [];
  
  };



















































 

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
    if(type =="none"){
      //  draw.current.style.backgroundColor = '#121212';
       draw.current.style.backgroundImage = 'none';
       draw.current.style.backgroundSize = '';
       draw.current.style.backgroundPosition = '';
    }
    else if (type =="line"){
       draw.current.style.backgroundColor = 'rgb(228, 225, 225)';
       draw.current.style.backgroundSize = '40px 40px';
       draw.current.style.backgroundImage = `
      linear-gradient(to right, #d2caca 1px, transparent 1px),
      linear-gradient(to bottom, #d2caca 1px, transparent 1px)
    ` 
    }
    else if(type =="dot"){
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
  if(type=="shortcut"){
  SetShowFirstBox(false)
  Setshortcut((prev)=>!prev)
  }
 }
   
 
 


 const handelMouseUp = ()=>{
  isDrawingState.current = false 
  isMovingInfrastcture.current  = false 
 }

 



useEffect(()=>{
  const handelDocMove = (e)=>{

    const boundriesimagess = draw.current.getBoundingClientRect();
 
       const x = e.clientX - boundriesimagess.left;
       const y = e.clientY - boundriesimagess.top;
       lastCordMoveImage.current.x = x 
       lastCordMoveImage.current.y = y
     
      
      HelperSlide.current.x =x  
      HelperSlide.current.y =y  
     // console.log("moving throw the document")
  }
  document.addEventListener("pointermove",handelDocMove)
  return()=>{
      document.removeEventListener("pointermove",handelDocMove)
  }
},[])




useEffect(()=>{



  const handel = (e)=>{
  isMovingInfrastcture.current=false
  
  }
  document.addEventListener("pointerup",handel)
  return()=>{
      document.removeEventListener("pointerup",handel)
  }
},[])



const handelcolortheme = (bgcolor) =>{
  console.log(bgcolor)
  draw.current.style.backgroundColor = bgcolor;
}





 const handelPointerLine = (e)=>{
         





 
 

     




 












 
 const typeTagName = e.target.tagName
 if(typeTagName =="image" && !isMovingInfrastcture.current && !ErraserMode.current){
  setmode("select")
 }
  if( typeTagName =="image"  && isMovingInfrastcture.current==true ){
      
 
      
       let currentx = e.clientX
       let currenty= e.clientY
 
       let dx = e.clientX-HelperSlide.current.x
       let dy = e.clientY-HelperSlide.current.y
       console.log(dx,dy,"the value should be pass")
       const  toTop = e.target.parentElement.style.transform;
         setmode("grab")
     
         const match = toTop.match(/translate\(([^,]+),\s*([^)]+)\)/);
  
       if (match) {
         let x = parseFloat(match[1]); 
         let y = parseFloat(match[2]);
  
          let newX = x+dx
          let newY = y+dy
          e.target.parentElement.style.transform = `translate(${newX}px, ${newY}px)`;  
         
          HelperSlide.current.x = currentx
          HelperSlide.current.y = currenty
         console.log(x, y);
      }



  }
 
  if(typeTagName=="text" || typeTagName =="image"  && ErraserMode.current && isDrawingState.current)  {

      console.log(e.target.tagName,"we détected you ")
      e.target.remove()
      setmode("eraser")
  }
  else if(typeTagName=="path" && ErraserMode.current && isDrawingState.current==true) {
 

     // delete from localStorage 
     const PathRemoved = e.target.getAttribute("d")
     const getAllDataLocalStorage = localStorage.getItem("paths")
     
     if(getAllDataLocalStorage){
      const parsedata = JSON.parse(getAllDataLocalStorage)
     
      const filterValideData = parsedata.filter((item)=>item.path!=PathRemoved)
      localStorage.setItem("paths",JSON.stringify(filterValideData))
     }




     
      
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
      e.target.remove()
      

}
    
  
 
 }
 
  function baaaaaatamn  (mode){
    switch(mode){
      case "pencil":
        return "d.png"
      case  "pen":
        return "b.png"
      case "eraser":
        return "h.png"
      case "select":
      return "cursor.png"
      case "grab":
        return "whitegrap.png.png"
    }
  }
   //onMouseEnter={()=>  ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height)}
 
useEffect(()=>{

const handelinput =(e)=>{

  if(e.ctrlKey  && e.key=="Backspace"){
    String.current  = ""
  }
  if(e.key==="Backspace") {

     console.log(String.current.split(" "))
     const copyFromString = [...String.current]
     copyFromString.pop()
   
    String.current  = copyFromString.join("")
    setx((prev)=>prev+1)
  }
 
  if(e.key.toLowerCase()=="e" && textmode.current == false){
    ErraserMode.current = true
    isDrawingState.current = false
    setmode("eraser")
    setx((prev)=>prev+1)

  } 
  if(e.key.toLowerCase()=="f" && !textmode.current)
  {
   ErraserMode.current = false
   console.log("should be clear canva here")
   setmode("pen")
  setx((prev)=>prev+1)
  }
  if ((e.key !== "Backspace" && /^[a-zA-Z]$/.test(e.key)) || e.key==" ") {
    String.current += e.key;
    setx((prev) => prev + 1);
  }




}
   document.addEventListener("keydown", handelinput);
    return () => {
       document.removeEventListener("keydown", handelinput);
    };
},[])
 
// in spec mode do false to drawing

 const handelOffMOdulex = ()=>{
   SetShowFirstBox(false)
 }
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
      style={{ cursor: mode=="text"? "text":`url('./controllers/${baaaaaatamn(mode)}') ${mode=="select" ? "11 16":mode=="pen"? "4 32":"4 32"}, auto` }}
      ref={draw}>
        <canvas
          id="Layer1"
          ref={canvas}
          onPointerMove={(e) => HandelMove(e)}
          onPointerDown={(e) => HandelDown(e)}
          onPointerUp={(e) => HandelPointerUp(e)}
          style={{zIndex:ErraserMode.current || cursormode.current ? "0":"1"}}
        ></canvas>

 
        <svg id="svg"
        
        onMouseUp={()=>handelMouseUp()}
        onPointerMove={(e)=>handelPointerLine(e)}
        onPointerDown={
          (e)=> {
            handelsvgdown(e)
             isDrawingState.current = true;
          }
             
               
      }
      

        >
               
         
        </svg>  
        {/* <svg id="svg2" >


        </svg> */}

    {
       ( textmode.current && clickabletext )  && 

         <div style={{position:"absolute",transform:`translate(${newcord.x}px,${newcord.y}px)`,background:"yellow",padding:"10px",fontFamily:"sans-serif",letterSpacing:"2"}}>


        <p>{ String.current ?  String.current : "we love porn hub"}</p>
       </div>

      }
 


      </div>

    {true && 
    
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
             cursormode.current = false
             textmode.current = false
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
          <img src="./leftSIdeImages/d.svg" draggable={false} onClick={()=>{
            textmode.current = true
             setmode("text")

             
          }}/>
        </div>
        <div className="FatherImages">
          <img src="./leftSIdeImages/e.svg" draggable={false} />
        </div>        <div className="FatherImages" onClick={() => HandelPasst()}>
          <img src="./leftSIdeImages/undo.svg" draggable={false} />
        </div>
        <div className="FatherImages" onClick={() => HandelFuture()}>
          <img src="./leftSIdeImages/redo.svg" draggable={false} />
        </div>

        <div className="FatherImages" onClick={() => {
          cursormode.current = true
          ErraserMode.current = false
          ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height)
          setmode("select")
          
        }}>
          <img src="./leftSIdeImages/select-svgrepo-com.svg" draggable={false} />
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
              max="22"
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
   
    {ShowSetting &&   <CompPrams onpassvalue={(e)=>HandelOption(e) }  isHidenavbar = {hidenavbar} />   }
     {!ShowSetting &&  <Setting send ={()=>SetShowSetting(true)}/>}
      
      {showFirstBox &&   
     <SettingsModal 
       typecolor={"black"}
       HandelTehme ={(e)=>HandelChangeGrid(e)}
       HandelTbgcolor ={(e)=>handelcolortheme(e) }
       handelOffMOdule = {()=>handelOffMOdulex()}

       />
       
       
       }
      {shortcut && <ShortcutsHint show ={shortcut}/>}
    </>
  );
};

export default RenderBoardOptimiaztion;
