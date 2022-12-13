import React from "react";

export default function Footer(props) {
    const isInherit = props.isInherit;

    const positionValue = isInherit ? "position-inherit" : "position-fixed";
    let footerClassName = "text-center text-lg-start " + positionValue;
    
    return (
        <div>
            <footer className={footerClassName}>
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