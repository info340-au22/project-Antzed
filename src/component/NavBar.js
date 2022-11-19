import React from "react";

export default function NavBar(props) {
    
    const pageName = props.pageName;



    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary shadow-sm rounded border border-dark">
          <div className="container-fluid">
            <div className="row">
              <div className="col-auto">
                <Brand isActive={pageName==="Home"}/>
              </div>
            </div>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link pageName = "Trail" isActive={pageName === "Trail"}/>
                    <Link pageName = "User" isActive={pageName === "User"}/>
                    <Link pageName = "Shop" isActive={pageName === "Shop"}/>
                    
                </ul>
            </div>
          </div>
        </nav>
        </div>
        
        
    )
}

function Link(props){
  const name = props.pageName 
  const isActive = props.isActive
  const lowerName = name.toLowerCase();
  let linkClassList = "nav-link";
  if (isActive){
    linkClassList+=" active";
  }
  return (
    <div>
      <li className="nav-item px-4">
        <a className={linkClassList} href={lowerName}>{name}</a>
      </li>
    </div>
  )

  
}

function Brand(props){
  let isActive =  props.isActive;
  const width = "5%";

  let brandClassList = "nav-link";
  if (isActive){
    brandClassList+=" active";
  }
  return(
    <div>
        <a className={brandClassList} id="logo" href="/"><img src="img/walking.png" alt="a logo of a man walking" width={width}></img>Get To The Trail</a>
      </div>
  )
}