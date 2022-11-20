import React from 'react';

export default function Filtershop(props){
    
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
                <a className="nav-link active" aria-current="page" href="#">All</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Clothing & Accessories</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Water filter</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Navigation</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">First Aid & Health</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pass</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Type" aria-label="Search" />
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>

          </div>
          </div>
          </nav>
          </div>
)
}