import React from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

export default function HomePage(props) {
    var myStyle= {
        backgroundImage: "url('./img/hiking-banner.jpg')",
        height: "100%`",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
    }
    return (
        <div>
            <NavBar pageName = "Home"/>
            <section style={myStyle}>
                <h1>Home Page</h1>
                <p>
                    some stuff
                    asdfasdf
                    asdfasdfdfas \n
                    f
                    asdfasdfasdf
                    asdfasdfdfasds
                    fdineh@uwasd
                    f
                </p>
            </section>
            <Footer isInherit={true}/>
        </div>
    )
}