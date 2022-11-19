import React from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

export default function UserPage(props) {
    return (
        <div>
            <NavBar pageName = "User"/>
            <h1>User Page</h1>
            <Footer />
        </div>
    )
}