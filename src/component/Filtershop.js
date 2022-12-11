import React, { useState } from 'react';

export default function Filtershop(props){



const [inputText, setInputText] = useState("");
const handleChange = (e) => {
    setInputText(e.target.value);
}


const filterSet = props.filterSet;
const filterList = (e) => {
   e.preventDefault();
  props.filterSet(inputText);
 }
 
    
return(
    <div className="FilterShop container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <strong className="text-dark"> Categories:</strong>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={() => filterSet("")}>All</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => filterSet("Clothing & Accessories")}>Clothing & Accessories</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => filterSet("Water filter")}>Water filter</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => filterSet("Navigation")}>Navigation</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => filterSet("First Aid & Health")}>First Aid & Health</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => filterSet("Pass")}>Pass</a>
              </li>
            </ul>
            <form className="d-flex">

              <input className="form-control me-2" type="search" placeholder="Type" aria-label="Search" 
                value={inputText}
                onChange={handleChange}
              />

              <button className="btn btn-outline-dark" type="submit"  aria-label="Submit" onClick={filterList}>Search</button>
            </form>

          </div>
          </div>
          </nav>
          </div>
)
}