import React from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import Popup from "../component/Popup";

// Todo: pop up
// Todo: fix ratio in diffeernt screen
function PopUpContent(props){
    return (
        <div className="d-flex rounded mt-4 cards relative-max-height ">
            <div className="col-12 ">
                <div className="card shadow-lg">
                    <img className="image relative-max-height" src="img/hiking-trail-1.jpg"></img>
                    <h1>hello</h1>
                    <p>
                        He watched as the young man tried to impress everyone in the room with his intelligence. There was no doubt that he was smart. The fact that he was more intelligent than anyone else in the room could have been easily deduced, but nobody was really paying any attention due to the fact that it was also obvious that the young man only cared about his intelligence.
                    </p>
                </div>
            </div>
            
        </div>
    )
}

export default function HomePage(props) {

    const [showPopup, setShowPopup] = React.useState(false);
    const handlePopup = () => {
        setShowPopup(!showPopup);
    }


    return (
        <div>
            <SectionA />
            <SectionB showPopup = {showPopup} setShowPopup ={setShowPopup} handlePopup={handlePopup}/>  
            <Popup trigger={showPopup} setTrigger={setShowPopup} content={<PopUpContent/>}/> 
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


    const [showPopup, setShowPopup, handlePopup] = [props.showPopup, props.setShowPopup, props.handlePopup];

    
    const cardList = [];
    for (let i = 0; i < 3; i++){
        cardList.push(<Card showPopup = {showPopup} setShowPopup ={setShowPopup} handlePopup={handlePopup} />);
    }

    return(
        <div >
            <section className={sectionBStyle}>
                <div className="container">
                    <div className="row">
                        {cardList}
                    </div>
                </div>
      
            </section>

        </div>
        
    )

}

function Card(props){
    const [showPopup, setShowPopup, handlePopup] = [props.showPopup, props.setShowPopup, props.handlePopup];
    return (     
        <div className="d-flex col-3 col-xl-3 rounded mx-auto cards home-cards">
            <div className="col-12 position-center">
                <div className="card shadow-lg bg-secondary">
                    <img className="card-img-top" src="img/hiking-trail-1.jpg" alt="Card image cap"></img>
                    <div className="card-body">
                    <h5 className="card-title">Hiking Trail 3</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button id="blog" href="#" class="btn btn-primary" onClick={() => setShowPopup(true)}>Go somewhere</button>
                    
                    </div>
                </div>
            </div>
        </div>

        
        
    )

}

