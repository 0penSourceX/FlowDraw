 
import RenderBoardOptimiaztion from "./Board/RenderBoardOptimiaztion"
import "./Board/RenderBoardOptimiaztion.css"
import {Routes as Router , Route as Path} from "react-router-dom"
import BootStrap from "./Component/BootStrap"
 
 
 

const App = () => {
  return (
      <> 
      <Router>
      <Path path={"/app/board"} element={ <RenderBoardOptimiaztion/> }/>
      <Path path={"/test"} element={<BootStrap/>}/>
      </Router>
   

      </>
  )

}


export default App


