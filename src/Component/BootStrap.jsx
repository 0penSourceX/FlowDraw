import { useEffect, useRef } from "react"

const BootStrap = () => {
  // make some sping in image
  // check  compte rendu ai
  // when you bind he table to sound like tikkkkkk
  // compte rendu ai
    const containerState = {
        width:"250px",
        height:"150px",
        background:"#f7f7f7",
        cursor:"grab",
        borderRadius:"8px",
        border:"1px solid #d8d1d1",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        userSelect: "none",
        transform:"translate(100px,100px)"
    }

    const bestFontSize = {
        fontSize: "23px",
        fontFamily: "Fira Code, monospace",
        fontWeight: "500",
        color: "#101312",
        padding: "10px",
        borderRadius: "6px",
    }

    const drag = useRef({
        x: 0,
        y: 0
    })

    const follow = useRef({
        x: 0,
        y: 0 
    })

 
    const postion = useRef(new Map())
    const movedrag = useRef(null)
    const isdraw = useRef(false)

    useEffect(()=>{
        const freeHandeMove =(event)=>{
            if(!isdraw.current) return

            const {clientX,clientY} = event
            
            let dx = clientX - drag.current.x 
            let dy = clientY - drag.current.y 

 
            follow.current.x += dx
            follow.current.y += dy 
           
            const el = movedrag.current;
            movedrag.current.style.transform = `translate(${follow.current.x}px, ${follow.current.y}px)`;
            movedrag.current.style.cursor = "grabbing";
            movedrag.current.style.transition = "transform 0.1s linear";
          
            
            postion.current.set(el,{x:follow.current.x,y:follow.current.y})
            drag.current.x = clientX
            drag.current.y = clientY
            console.log(postion.current)
        }

        document.addEventListener("pointermove",freeHandeMove)

        return()=>{
            document.removeEventListener("pointermove",freeHandeMove)
        }
    },[])

    const freedown = (event)=>{
        const {clientX,clientY} = event
      
        isdraw.current = true
        drag.current.x = clientX 
        drag.current.y = clientY 
        movedrag.current = event.currentTarget
        const el = movedrag.current;

        const prev = postion.current?.get(el) || { x: 0, y: 0 };
   
        follow.current.x = prev.x
        follow.current.y = prev.y
    
        
       
    }

    useEffect(()=>{
        const freehand = ()=>{
            isdraw.current = false
            movedrag.current.style.cursor = "grab";
           
           

          
        }

        document.addEventListener("pointerup",freehand)

        return()=>{
            document.removeEventListener("pointerup",freehand)
        }
    },[])

    return (
        <div style={{height:"200vh"}}>
            <div style={containerState}    onPointerDown={(e) => {freedown(e)}} >
                <h3 style={bestFontSize}>welcome devs1</h3>
            </div>

            <div style={containerState}  onPointerDown={(e) => {freedown(e)}} >
                <h3 style={bestFontSize}>welcome devs2</h3>
            </div>

            <div style={containerState}  onPointerDown={(e) => {freedown(e)}} >
                <h3 style={bestFontSize}>welcome devs3</h3>
            </div>

              <div style={containerState}  onPointerDown={(e) => {freedown(e)}} >
                <h3 style={bestFontSize}>welcome devs4</h3>
            </div>


              <div style={containerState}  onPointerDown={(e) => {freedown(e)}} >
                <h3 style={bestFontSize}>welcome devs5</h3>
            </div>


              <div style={containerState}  onPointerDown={(e) => {freedown(e)}} >
                <h3 style={bestFontSize}>welcome devs6</h3>
            </div>

        </div>
    )
}

export default BootStrap