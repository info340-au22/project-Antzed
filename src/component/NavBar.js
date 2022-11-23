import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar(props) {
    
    const pageName = props.pageName;



    return (
        <div>
            <Navbar collapseOnSelect bg="primary" shadow='sm' expand="lg">
              <Container fluid>
                <Brand isActive={pageName==="Home"}/>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link pageName = "Trail" isActive={pageName === "Trail"}/>
                        <Link pageName = "Shop" isActive={pageName === "Shop"}/>
                        <Link pageName = "User" isActive={pageName === "User"}/>
                        
                    </ul>
                </Navbar.Collapse>

              </Container>
             

            </Navbar>
            {/* <nav className="navbar navbar-expand-lg bg-primary shadow-sm rounded border border-dark">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-auto">
                    
                  </div>
                </div>
                
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link pageName = "Trail" isActive={pageName === "Trail"}/>
                        <Link pageName = "Shop" isActive={pageName === "Shop"}/>
                        <Link pageName = "User" isActive={pageName === "User"}/>
                        
                    </ul>
                </div>
              
              </div>
            </nav> */}
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

  let brandClassList = "nav-link navbar-brand";
  if (isActive){
    brandClassList+=" active";
  }
  return(
      <>
      <div className="text-lg-start text-center">
        <a className={brandClassList} id="logo" href="/"><img src="img/walking.png" alt="a logo of a man walking" width={width}></img>Get To The Trail</a>
      </div>
      </>
  )
}