import React from "react";

export function Card(props){
    const [handlePopup, setSectionBPopup] = [props.handlePopup, props.setSectionBPopup];
    

    function set(){
        setSectionBPopup(true);
        
    }
    return (     
        <div className="d-flex col-lg-6 col-md-6 col-xs-12 col-xl-3 rounded mx-auto cards">
            <div className="col-12 position-center">
                <div className="card shadow-lg bg-light home-cards">
                    <img className="blog-card-img" src={props.img} alt="Card image cap"></img>
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p id="card-author">by {props.author}</p>
                        <p className="card-text">{props.description}</p>
                        <button id={props.title} href="#" className="btn btn-primary" aria-label="a button that leads to a pop up" onClick={() => {handlePopup(props.title); set();}}>Go see blog</button>
                    </div>
                </div>
            </div>
        </div>  
    )
}