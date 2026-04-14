 
import "./Board/BoardRenderer.css"
import {Routes as Router , Route as Path} from "react-router-dom"
import BootStrap from "./Component/BootStrap"
import BoardRenderer from "./Board/BoardRenderer"
 
 
 

const App = () => {
  return (
      <> 
      <Router>
      <Path path={"/app/board"} element={ <BoardRenderer/> }/>
      <Path path={"/test"} element={<BootStrap/>}/>
   
      </Router>
   

      </>
  )

}


export default App


