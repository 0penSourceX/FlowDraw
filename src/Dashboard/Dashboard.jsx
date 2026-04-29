import { StrictMode, useState } from "react"
import Session from "../Component/Session"
import "./Dashboard.css"
import BoxShow from "../Component/BoxShow"
import FilterSortNavbar from "./FilterSortNavbar"
 
 
const Dashboard = () => {
  const [DispalyType,SetDisplayItem]  = useState(true)
  const [data,setdata] = useState([1,2,3,4,5,6,7,82,3,4,5,6,7,2,3,4,5,6,7,2,3,4,5,6,7,2,3,4,5,6,7,])
  const UpdateFIleration  =()=>{
    SetDisplayItem((prev)=>!prev)
    console.log("working")
  }
  return (
    <div className="dashboard">

 
        
  <div className="side-bar">

    <div className="title-side-bar">
       <img src="./headerImage.png" alt=""/>
       <h3>My workspace</h3>
      
      </div>

      <div className="side-bar-search">   
      <img src="/searchv1.svg" alt=""/>
      <input type="text" placeholder="search by title topic" /> 
      </div>

    <div className="group"> 
    <div className="item active">
      <div className="icon">
       
        <svg viewBox="0 0 24 24">
          <path d="M3 10L12 3L21 10V20H14V14H10V20H3V10Z"/>
        </svg>
      </div>
      <span>Home</span>
    </div>

    <div className="item">
      <div className="icon">
      
        <svg viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 1 0 12 22A10 10 0 1 0 12 2ZM13 7H11V13L16 16L17 14L13 12V7Z"/>
        </svg>
      </div>
      <span>Recent</span>
    </div>

    <div className="item">
      <div className="icon">
       
        <svg viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
        </svg>
      </div>
      <span>Starred</span>
      <span className="numberOf-started">1</span>
    </div>
  </div>
 
   <div className="personal-inforamtion">
    <hr/>
    <div className="information">
      <div className="first-inforamtion">   <img src="./headerImage.png" alt=""/></div>
      <div className="seconde-inforamtion">
        <div className="leftinforamtion">
          <h3>Gahith</h3>
          <h4>Free plan</h4>
        </div>
        <div className="seconde-inforamtion1">...</div>
      </div>
    </div>
   </div>
   
  </div> 
 
            

  <div className="section-content">

    <div className="section-content-navbar">
      <div className="leftside"><h2 className="logo" >followDraw</h2></div>
      <div className="rightside"></div>
    </div>


    <div className="section-view">
      <BoxShow/> <BoxShow/> <BoxShow/> <BoxShow/>
    </div>
    <div className="section-part">
       
      <FilterSortNavbar fn ={UpdateFIleration} f ={DispalyType}/>
      <div className={DispalyType?"content-session" :"specialkey-content-session"}> {data.map((item)=><Session/>)} </div>
    </div>

  </div>

    </div>
  )
}

export default Dashboard