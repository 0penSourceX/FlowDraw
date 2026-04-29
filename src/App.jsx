 
import "./Board/BoardRenderer.css"
import {Routes as Router , Route as Path} from "react-router-dom"
import BootStrap from "./Component/BootStrap"
import BoardRenderer from "./Board/BoardRenderer"
import Dashboard from "./Dashboard/Dashboard"
import Home from "./Home/Home"
 
 
 

const App = () => {
  return (
      <> 
      <Router>
      <Path path={"/app/board"} element={ <BoardRenderer/> }/>
      <Path path={"/v"} element={<Dashboard/>}/>
      <Path path={"/test"} element={<BootStrap/>}/>
      <Path path={"/"} element={<Home/>}/>
     
       
      
      </Router>
   

      </>
  )

}


export default App


