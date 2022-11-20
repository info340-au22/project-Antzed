import React from "react";

export default function Popup(props){
    let isVisable = props.isVisable
    return (
        <div className="popup">
                <div className="popup_inner">
                    <h1>pop up</h1>
                    {/* <button onClick={props.closePopup}>close me</button> */}
                </div>
        </div>
    );
}