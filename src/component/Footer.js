import React from "react";

export default function Footer(props) {
    const isInherit = props.isInherit;

    const positionValue = isInherit ? "inherit" : "fixed";
    console.log(positionValue);
    let footerStyle = {
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        position: {positionValue},
        bottom: "0",
        left: "0",
        width: "100%"
    }

    return (
        <div style={footerStyle}>
            <footer className="text-center text-lg-start">
                <div className="text-center p-3">
                <p>© 2022 Copyright</p>
                <address>
                    <a href="mailto:fdineh@uw.edu, anthoz3@uw.edu, ctu4@uw.edu, Bbferry@uw.edu">Contact us here </a> 
                </address>
                </div>
            </footer>
        </div>
    )
}