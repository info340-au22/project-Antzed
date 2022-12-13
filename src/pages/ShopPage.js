import React, { useEffect, useState } from "react";
import Filtershop from "../component/Filtershop";
import Cardshop from "../component/Cardshop";
import "../index.css"


export default function ShopPage(props) {
    const [cards, setCards] = useState([]);
    const [errorOccured, setErrorOccured] = useState();

    useEffect(() => {
        fetch(`/shopstore.json`)
        .then((res) => res.json())
        .then( res => setCards(res))
        .catch((err) => setErrorOccured(true))
    },[])



    const [filter, setFilter] = useState("");

    const handleFilter = (inputText) => {
        setFilter(inputText);
    }

    if(errorOccured) {
        return <div> An error occured </div>
    }

    return (
        <div className="ShopPage">
        <main>
        <section className="ShopPage_products">
            <Filtershop
                filterSet={handleFilter}
            />
            <Cardshop
                cards={cards.filter((card => 
                    filter 
                    ? card.category === filter || card.title.toLowerCase().includes(filter.toLowerCase())
                    : true))} 
                />
        </section>
        </main>
        </div>
    )
}