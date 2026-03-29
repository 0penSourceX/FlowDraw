 
import styled from 'styled-components';
import "./grid.css"
const Grid = ({passValue}) => {
  return (
    <StyledWrapper>
      <div className="glass-radio-group ">
        <input type="radio" name="plan" id="glass-silver" />

        <label htmlFor="glass-silver" onClick={()=>passValue("noGrid")}>
            <img src='/leftSIdeImages/value-none-svgrepo-com.svg'/>
             Noo Grid</label>
        <input type="radio" name="plan" id="glass-gold" defaultChecked />

        <label htmlFor="glass-gold" onClick={()=>passValue("Linegrid")}>
           <img src='/leftSIdeImages/grid.svg'/>
          Line Grid</label>

        <input type="radio" name="plan" id="glass-platinum" />
        <label htmlFor="glass-platinum" onClick={()=>passValue("Dot")}>
       <img src='/leftSIdeImages/dot.svg'/>  Dot Grid</label>

        <div className="glass-glider" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .glass-radio-group {
    --bg: rgba(255, 255, 255, 0.06);
    --text: #4e5b5e;
     font-family: sans-serif;
    display: flex;
    flex-direction: column;
    position: relative;
    background: var(--bg);
    border-radius: 1rem;
    backdrop-filter: blur(12px);
    box-shadow:
      inset 1px 1px 4px rgba(255, 255, 255, 0.2),
      inset -1px -1px 6px rgba(0, 0, 0, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    width: fit-content;
    position:absolute;
    top:50%;
    left:50%;
    z-index:99;
    transform:translate(-50%,-50%);
    
  }

  .glass-radio-group input {
    display: none;
  }

  .glass-radio-group label {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 80px;
    font-size: 14px;
    padding: 0.8rem 1.6rem;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: var(--text);
    position: relative;
    z-index: 2;
    transition: color 0.3s ease-in-out;
  }

  .glass-radio-group label:hover {
    color: white;
  }

  .glass-radio-group input:checked + label {
    color: #fff;
  }

  .glass-glider {
    position: absolute;
    top: 0;
    bottom: 0;
    height: calc(100% / 3);
    width: 100%;
    border-radius: 1rem;
    z-index: 1;
    transition:
      transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56),
      background 0.4s ease-in-out,
      box-shadow 0.4s ease-in-out;
  }

  /* Silver */
  #glass-silver:checked ~ .glass-glider {
    transform: translateY(0%);
    background: linear-gradient(135deg, #c0c0c055, #e0e0e0);
    box-shadow:
      0 0 18px rgba(192, 192, 192, 0.5),
      0 0 10px rgba(255, 255, 255, 0.4) inset;
  }

  /* Gold */
  #glass-gold:checked ~ .glass-glider {
    transform: translateY(100%);
    background: linear-gradient(135deg, #ffd70055, #e0e0e0);
     box-shadow:
      0 0 18px rgba(192, 192, 192, 0.5),
      0 0 10px rgba(255, 255, 255, 0.4) inset;
  }

  /* Platinum */
  #glass-platinum:checked ~ .glass-glider {
    transform: translateY(200%);
    background: linear-gradient(135deg, #d0e7ff55, #a0d8ff);
     box-shadow:
      0 0 18px rgba(192, 192, 192, 0.5),
      0 0 10px rgba(255, 255, 255, 0.4) inset;
  }`;

export default Grid;
