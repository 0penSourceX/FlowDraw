import { useEffect, useRef, useState } from "react"
//const debut = document.timeline.currentTime;
import floating from "floating.js";
    // floating({
    //   content:
    //     '<img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Weather-snow.svg">',
    //   number: 10,
    //   direction: "reverse",
    //   size: [1, 10]
    // });

import Confetti from "react-confetti";
const FlowELement = ( {show,l}) => {

// do setimeout about 5sec and stop the like here by stopfloating
   // add shapess
  const handelLike = ()=>{
 
    floating({ content: l, number: 3, duration: 11 });

    setTimeout(() => {
      stopFloating()
    }, 3000);
  }
  const stopFloating = () => {
    const floats = document.querySelectorAll(".float-container");
    floats.forEach(el => el.remove());
  };

  return (
 
    <div>
     
      {show=="magique" && <Confetti numberOfPieces={555} recycle={false} />}
      {show == "like" && handelLike()}
    </div>
  )
}

export default FlowELement