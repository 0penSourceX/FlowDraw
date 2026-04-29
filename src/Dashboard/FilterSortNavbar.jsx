 
import "./FilterSortNavbar.css";

const   FilterSortNavbar = ({fn ,f}) => {
  return (
    <>
    
    <h1 className="title-team"  >Board in this Team</h1>

    <div className="filter-sort-navbar">
      
      <div className="filter-sort-navbar__left">
        <div className="filter-sort-navbar__filter">
          <span className="filter-sort-navbar__label">Filter by</span>
          <select className="filter-sort-navbar__select">
            <option>All boards</option>
            <option>My boards</option>
            <option>Shared boards</option>
          </select>
        </div>

        <div className="filter-sort-navbar__sort">
          <span className="filter-sort-navbar__label">Sort by</span>
          <select className="filter-sort-navbar__select">
            <option>Last opened</option>
            <option>Name</option>
            <option>Date created</option>
          </select>
        </div>
      </div>

      <div className="filter-sort-navbar__right">
        <button className="filter-sort-navbar__icon-btn" onClick={()=>fn()}>{!f ?  <span> ☰</span> :  <span>▦</span>}</button>
      
      </div>
    </div>
        </>
  );
}


export default  FilterSortNavbar