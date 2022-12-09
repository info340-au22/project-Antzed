import React from "react";

export default function Popup(props){
    let popupClass = "popup"
    let setToFalse = props.setToFalse;

    function set(){
        setToFalse(false)
    }

    
    return (props.trigger) ? (
        <div className={popupClass}>
                <div className="popup-inner">
                <button className="close-btn" onClick={() =>{props.setTrigger(false)}}>close me</button>
                    <h1>{props.content}</h1>
                </div>
        </div>
    ):"";
}