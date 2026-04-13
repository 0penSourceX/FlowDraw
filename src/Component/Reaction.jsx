 
import { useEffect, useRef, useState } from 'react';
import FlowELement from './FlowELement';
import './Reaction.css';

const Reaction = () => {

 
 const [showMqgique,SetShowMagique] = useState(false)
 const [type,settype] = useState("magique")
 const [logo,setLogo] = useState("👍")
    let  clear = useRef(null)
  useEffect(()=>{
    if(showMqgique==true){
   clear.current =  setTimeout(()=>{
            SetShowMagique(false)
        },6000)
    }

    return()=>{
        clearInterval(clear.current)
    }
  },[showMqgique])

   
  return (
  <> 
  
  <div className="button-container">
      <button className="reaction-button like"     onClick ={()=>{
            SetShowMagique(true)
            settype("like")
            setLogo("👍")
        }
        
        }             
            >👍</button>
      <button className="reaction-button cheer">👏🏻</button>
      <button className="reaction-button celebrate">🎉</button>
      <button className="reaction-button appreciate" onClick={()=>{
        SetShowMagique(true)
        settype("magique")
      }}>✨</button>
      <button className="reaction-button smile"
      onClick={()=>{
        SetShowMagique(true)
        settype("like")
        setLogo("🙂")
      }}
      >🙂</button>
    </div>
    
   {showMqgique &&  <div className="container-d">
      <FlowELement  show={type} l={logo}/>
 
    </div>  }
    </>
  );
};  

export default Reaction;