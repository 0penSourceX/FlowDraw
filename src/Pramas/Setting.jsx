import "./Setting.css"
 
 const Setting = ({send}) => {
   return (
     <div
      className="Seeting" draggable={false} onClick={send}>
            <img src='/leftSIdeImages/ellipis.svg'  draggable={false} style={{width:"40px"}}/>
        </div>
   )
 }
 
 export default Setting