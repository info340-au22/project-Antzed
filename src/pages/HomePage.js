import React from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

export default function HomePage(props) {
    return (
        <div>
            <NavBar pageName = "Home"/>
            <h1>Home Page</h1>
            <Footer />
        </div>
    )
}