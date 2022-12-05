import React, { useState } from "react";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import Filtershop from "../component/Filtershop";
import Cardshop from "../component/Cardshop";
import "../index.css"
import cards from "../data/shopstore.json"

export default function ShopPage(props) {



    const [filter, setFilter] = useState("");
    const handleFilter = (inputText) => {
        setFilter(inputText);
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
                    ? card.category === filter
                    : true))} 
                />
        </section>
        </main>
        </div>
    )
}