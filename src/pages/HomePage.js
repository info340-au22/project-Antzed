import React from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

export default function HomePage(props) {
    
    return (
        <div>
            <SectionA />
            <SectionB />    
            <Footer isInherit={true}/>
        </div>
    )
}

function SearchBar(props){
    const searchBarStyle= "position-relative home-searchBar";
    return (
        <div className={searchBarStyle}>
          <div className="align-item-center justify-content-center px-5">
            <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Search for a Trail or Item" aria-label="Search" aria-describedby="search-addon" />
              <span className="input-group-text border-0" id="search-addon">
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </span>
            </div>
          </div>
        </div>
    )
}

function SectionA(props){
    let sectionAStyle = "home-background height-100vh background-no-repeat background-center";
    return (
        <div>
            <section className={sectionAStyle}>
                <NavBar pageName = "Home"/>
                
                <SearchBar />
            </section>
        </div>
    )
}



function SectionB(props){
    // review-background pattern-diagonal-lines-sm 
    let sectionBStyle = "home-sectionB height-100vh review-background pattern-diagonal-lines-sm";
    return(
        <div >
            <section className={sectionBStyle}>
                <div className="container">
                    <div className="row">
                        <Card />
                        <Card />
                        <Card />


                    </div>
                </div>
      
            </section>

        </div>
        
    )

}

function Card(props){

    return (
        <div className="d-flex col-3 col-xl-3 rounded mx-auto cards">
            <div className="col-12">
                <div className="card shadow-lg bg-secondary">
                    <img className="card-img-top" src="img/hiking-trail-1.jpg" alt="Card image cap"></img>
                    <div className="card-body">
                    <h5 className="card-title">Hiking Trail 3</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    )

}

