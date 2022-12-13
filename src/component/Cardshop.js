import React from "react";

export default function Cardshop(props){

    const cards = props.cards;

    return(
        <section className="product_buy">
        <div className="row d-flex">

        { cards.map(card => (
            <CardItem 
              {...card}
              key={card.title}
            />
        ))}
</div> 
</section>
    )
 }

 export const CardItem = (props) => {
     const { title, description, price, imageName, store } = props;
     return (
        <div className="col-md-4 col-lg-3 d-flex mt-2">  
        <div className="card" style={{width: '18rem'}}>
        <div className="card-body">
            <img className="card-img-top pb-3" src={"../img/"+ imageName} alt="a logo of a man walking" height={'350px'}/>
            <h2 className="card-title"> {title } </h2>
            <p className="card-text"> {description} </p>
            <p className="card-text">Price: {price} </p>
            <a href={store} target="_blank" className="btn btn-outline-dark">Buy</a>
    </div>
    </div>
    </div>
     )
 }