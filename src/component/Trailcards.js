import React from "react";

function SingleCard(props) {
    const cardData = props.cardObjData
    return (
        <div className="container">
            <div className="row">
                <div className="d-flex col-auto col-md-6 col-xl-3 rounded mt-4">
                    <div className="card">
                        <img src={cardData.img} className=".card-img-top" alt={cardData.title} />
                        <div classname="card-body">
                            <h2>{cardData.title}</h2>
                            <p>{cardData.description}</p>
                            <SeeMoreButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SeeMoreButton(props) {
    
}
export function TrailCards(props) {
    const cardsData = props.cards
    const singleCardData = cardsData.map((cardObj) => {
        return (
            <SingleCard cardObjData={cardObj} key={cardObj.title}/>
        )
    });
    return (
        <div></div>
    )
}