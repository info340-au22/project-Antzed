import React from "react";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import Filtershop from "../component/Filtershop";
import Cardshop from "../component/Cardshop";
import "../index.css"

export default function ShopPage(props) {
    return (
        <div className="ShopPage">
        <main>
            <NavBar pageName = "Shop"/>
            <Filtershop />
        <section className="product_buy">
            <Cardshop />
        </section>
        </main>

        {/* <footer> */}
            <Footer />
        {/* </footer> */}
        </div>
    )
}