import React, { useState } from "react";
import "./PenSkins.css";

const penSkins = [
  {
    id: "default",
    name: "Default",
    cursor: "crosshair",
  },
  {
    id: "dot",
    name: "Dot",
    cursor: "url('/cursors/dot.png') 8 8, auto",
  },
  {
    id: "circle",
    name: "Circle",
    cursor: "url('/cursors/circle.png') 16 16, auto",
  },
  {
    id: "brush",
    name: "Brush",
    cursor: "url('/cursors/brush.png') 16 16, auto",
  },
];

 const   Sking = () =>{
  const [activeSkin, setActiveSkin] = useState("default");

  const handleSelect = (skin) => {
    console.log(skin)
    setActiveSkin(skin.id);
    //document.body.style.cursor = skin.cursor;
  };

  return (
    <div className="skin-container">
      <div className="skin-bar">
        {penSkins.map((skin) => (
          <button
            key={skin.id}
            className={`skin-btn ${
              activeSkin === skin.id ? "active" : ""
            }`}
            onClick={() => handleSelect(skin)}
          >
            {skin.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sking

