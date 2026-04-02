import { useState } from "react";
import "./SettingsModal.css";
import { useEffect } from "react";
import { Colors } from "../BufferColor";

const SettingsModal = ({typecolor ,HandelTehme,HandelTbgcolor,handelOffMOdule}) => {
  const [grid, setGrid] = useState("line");
  useEffect(()=>{
    HandelTehme(grid)
    localStorage.setItem("grid",grid)
  },[grid])
  const [theme, setTheme] = useState("#E4E1E1");
 useEffect(()=>{
    HandelTbgcolor(theme)
    localStorage.setItem("theme",theme)
    console.log(theme)
  },[theme])

  function typecolorx(typecolor){
   switch(typecolor){
    case  "white":
      return "rgba(221, 217, 217, 0.3)"
    case "black":
         return "rgba(235, 229, 229, 0.99)"
   }
  }
  return (
    <div className="wrapper">
      <div className="bg" />

      <div className="modal" style={{background: typecolorx(typecolor)}}>
        {/* Header */}
        <div className="header">
          <span style={{color:typecolor=="white"?"white":"black"}}>Settings</span>
          <button className="close" onClick={()=>handelOffMOdule()}>
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Grid Options */}
        <div className="section">
          <div className="label">
            {/* grid icon */}
            <svg width="16" height="16" viewBox="0 0 24 24">
              <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="15" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="3" y="15" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="15" y="15" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span style={{color:typecolor=="white"?"white":"black"}}>Grid Options</span>
          </div>

          <div className="segmented">
            <button
              onClick={() => setGrid("none")}
              className={grid === "none" ? "active" : ""}
            >
              {/* no grid icon */}
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path d="M4 4L20 20" stroke="currentColor" strokeWidth="2"/>
              </svg>
              No Grid
            </button>

            <button
              onClick={() => setGrid("line")}
              className={grid === "line" ? "active" : ""}
            >
              {/* line grid */}
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Line Grid
            </button>

            <button
              onClick={() => setGrid("dot")}
              className={grid === "dot" ? "active" : ""}
            >
              {/* dot grid */}
              <svg width="14" height="14" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
                <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
                <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
              </svg>
              Dot Grid
            </button>
          </div>
        </div>

        {/* Background */}
        <div className="section">
          <div className="label">
            {/* palette icon */}
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M12 3C7 3 3 7 3 12C3 16 6 19 10 19H12C13 19 14 18 14 17C14 16 13 15 12 15H11C8 15 6 13 6 11C6 8 9 5 12 5C15 5 18 8 18 11" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            <span style={{color:typecolor=="white"?"white":"black"}}>Background Color</span>
          </div>

          <div className="colors">

 
           {
            Colors.map((item)=> 
              <div
              key={item}
              className={`color ${theme === item ? "selected" : ""}`}
              onClick={() => setTheme(item)}
              style={{background:item}}
              
            />
            )
           }


          </div>

           

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;