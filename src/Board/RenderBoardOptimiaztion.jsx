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

  const [sizeLine, setSizeLine] = useState(5);
  const [colorState, SetColorState] = useState("black");
  const [show, SetShow] = useState(false);
  const [ShowSetting,SetShowSetting] = useState(false)
  const [showFirstBox,SetShowFirstBox] = useState(false)
 
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
      event.preventDefault();
      if (event.ctrlKey && event.key.toLowerCase() == "z") {
        const newArray = easy.FuncEndo();
        if (!newArray) return;
        reset(document);
        for (let i = 0; i < newArray.length; i++) {
          DrawPoints(newArray[i], colorState, sizeLine, refrences);
        }
      }
      if (event.ctrlKey && event.key.toLowerCase() == "v") {
        const newArray = easy.FuncRendo();
        if (!newArray) return;
        reset(document);
        for (let i = 0; i < newArray.length; i++) {
          DrawPoints(newArray[i], colorState, sizeLine, refrences);
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
    }
      draw.current.addEventListener("click",ListenClick)

      return()=>{
        draw?.current?.removeEventListener("click",ListenClick)
      }
  },[])

  const HandelMove = (e) => {
    if (!isDrawingState.current || ErraserMode.current) return;
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
    const BoundriesDraw = draw.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const x = clientX - BoundriesDraw.left;
    const y = clientY - BoundriesDraw.top;
    cord.current.x = x;
    cord.current.y = y;
  };
  const refrences = (e) => {
    if (!ErraserMode.current) return;
    if(ErraserMode.current && isDrawingState.current){
  const newArray = Buffer.current.Erraser(e);
    if (!newArray) return;
    reset(document);
    for (let i = 0; i < newArray.length; i++) {
      DrawPoints(newArray[i], colorState, sizeLine, refrences);
    }
    }
  
  };
  const HandelPointerUp = (e) => {
    isDrawingState.current = false;
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    let reduced = simplify(Points.current, 2);
    reduced.length > 0 && AllPath.current.push(reduced);

    const d = buildPath(reduced);

    Buffer.current.pushItems([d]);

    DrawPoints(d, colorState, sizeLine, refrences);
    Points.current = [];
  };
  const handelChangeColor = (color) => {
 
    SetShow(false);
    SetColorState(color);
  };
  const HandelFuture = () => {
    let easy = Buffer.current;
    const newArray = easy.FuncRendo();
    if (!newArray) return;
    reset(document);
    for (let i = 0; i < newArray.length; i++) {
      DrawPoints(newArray[i], colorState, sizeLine, refrences);
    }
  };
  const HandelPasst = () => {
    let easy = Buffer.current;
    const newArray = easy.FuncEndo();
    if (!newArray) return;
    reset(document);
    for (let i = 0; i < newArray.length; i++) {
      DrawPoints(newArray[i], colorState, sizeLine, refrences);
    }
  };  
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
 
  if(type=="grid"){
    SetShowFirstBox(true)
  }
 }
 

  return (
    <>
      <div className="navbar">
        <span className="o">
          OpenSourceX {numberOfPage.current}
          <img src="openSource.png" alt="logo" />
        </span>

        <span>Untitled</span>
        <button >Share</button>
      </div>

      <div className="draw" ref={draw}>
        <canvas
          id="Layer1"
          ref={canvas}
          onPointerMove={(e) => HandelMove(e)}
          onPointerDown={(e) => HandelDown(e)}
          onPointerUp={(e) => HandelPointerUp(e)}
        ></canvas>

        <svg id="Layer2"></svg>
      </div>

      <div className="leftSide">


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
          }}

        >
          <img src="./leftSIdeImages/b.svg" draggable={false} />
        </div>
          <div className="FatherImages" onClick={() => (ErraserMode.current = true)}>
         <img src="./leftSIdeImages/f.svg" draggable={false} />
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
